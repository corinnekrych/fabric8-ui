import {
  ErrorHandler,
  Inject,
  Injectable,
  InjectionToken,
  OnDestroy
} from '@angular/core';

import {
  Headers,
  Http,
  Response
} from '@angular/http';

import {
  Observable,
  ReplaySubject,
  Subject,
  Subscription
} from 'rxjs';

import { NotificationsService } from '../../../shared/notifications.service';

import { AuthenticationService } from 'ngx-login-client';

import { WIT_API_URL } from 'ngx-fabric8-wit';

import {
  Logger,
  Notification,
  NotificationType
} from 'ngx-base';

import {
  flatten,
  has,
  includes,
  isEmpty,
  isEqual as deepEqual,
  round
} from 'lodash';

export declare interface Stat {
  readonly used: number;
  readonly quota: number;
  readonly timestamp?: number;
}

export declare interface CpuStat extends Stat {}

export type MemoryUnit = 'bytes' | 'KB' | 'MB' | 'GB';

export declare interface MemoryStat extends Stat {
  readonly units: MemoryUnit;
}

export interface EnvironmentAttributes {
  name: string;
  quota: Quota;
}

export interface EnvironmentStat {
  attributes: EnvironmentAttributes;
  id: string;
  type: string;
}

export interface EnvironmentsResponse {
  data: EnvironmentStat[];
}

export interface Quota {
  cpucores: CpuStat;
  memory: MemoryStat;
}

export interface CoresSeries extends SeriesData { }

export interface MemorySeries extends SeriesData { }

export interface NetworkSentSeries extends SeriesData { }

export interface NetworkReceivedSeries extends SeriesData { }

export interface SeriesData {
  time: number;
  value: number;
}

export class ScaledMemoryStat implements MemoryStat {

  private static readonly UNITS = ['bytes', 'KB', 'MB', 'GB'];

  public readonly units: MemoryUnit;

  constructor(
    public readonly used: number,
    public readonly quota: number,
    public readonly timestamp?: number
  ) {
    let scale = 0;
    if (this.used !== 0) {
      while (this.used > 1024 && scale < ScaledMemoryStat.UNITS.length) {
        this.used /= 1024;
        this.quota /= 1024;
        scale++;
      }
    } else {
      while (this.quota > 1024 && scale < ScaledMemoryStat.UNITS.length) {
        this.quota /= 1024;
        scale++;
      }
    }
    this.used = round(this.used, 1);
    this.quota = round(this.quota, 1);
    this.units = ScaledMemoryStat.UNITS[scale] as MemoryUnit;
  }
}

export const TIMER_TOKEN: InjectionToken<Observable<void>> = new InjectionToken<Observable<void>>('DeploymentsServiceTimer');
export const TIMESERIES_SAMPLES_TOKEN: InjectionToken<number> = new InjectionToken<number>('DeploymentsServiceTimeseriesSamples');

const FAKE_SPACE_ID = 'f461b06c-3833-11e8-b467-0ed5f89f718b';

@Injectable()
export class ResourceService implements OnDestroy {
  static readonly INITIAL_UPDATE_DELAY: number = 0;
  static readonly POLL_RATE_MS: number = 60000;

  private readonly headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  private readonly apiUrl: string;

  private readonly envsObservables: Map<string, Observable<EnvironmentStat[]>> = new Map<string, Observable<EnvironmentStat[]>>();

  private readonly serviceSubscriptions: Subscription[] = [];

  constructor(
    private readonly http: Http,
    private readonly auth: AuthenticationService,
    private readonly logger: Logger,
    private readonly errorHandler: ErrorHandler,
    private readonly notifications: NotificationsService,
    @Inject(WIT_API_URL) private readonly witUrl: string,
    @Inject(TIMER_TOKEN) private readonly pollTimer: Observable<void>,
    @Inject(TIMESERIES_SAMPLES_TOKEN) private readonly timeseriesSamples: number
  ) {
    if (this.auth.getToken() != null) {
      this.headers.set('Authorization', `Bearer ${this.auth.getToken()}`);
    }
    this.apiUrl = witUrl + 'deployments/spaces/';
  }

  ngOnDestroy(): void {
    this.serviceSubscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  getEnvironments(): Observable<string[]> {
    return this.getEnvironmentsResponse('f461b06c-3833-11e8-b467-0ed5f89f718b')
      .map((envs: EnvironmentStat[]) => envs || [])
      .map((envs: EnvironmentStat[]) => envs.map((env: EnvironmentStat) => env.attributes))
      .map((envs: EnvironmentAttributes[]) => envs.sort((a, b) => -1 * a.name.localeCompare(b.name)))
      .map((envs: EnvironmentAttributes[]) => envs
        .map((env: EnvironmentAttributes) => env.name)
      )
      .distinctUntilChanged((p: string[], q: string[]) => deepEqual(new Set<string>(p), new Set<string>(q)));
  }

  getEnvironmentMemoryStat(spaceId: string, environmentName: string): Observable<MemoryStat> {
    return this.getEnvironment(spaceId, environmentName)
      .map((env: EnvironmentStat) => new ScaledMemoryStat(env.attributes.quota.memory.used, env.attributes.quota.memory.quota));
  }

  getEnvironmentCpuStat(spaceId: string, environmentName: string): Observable<CpuStat> {
    return this.getEnvironment(spaceId, environmentName)
      .map((env: EnvironmentStat) => env.attributes.quota.cpucores);
  }

  private getEnvironment(spaceId: string, environmentName: string): Observable<EnvironmentStat> {
    // does not emit if there are no environments matching the specified name
    return this.getEnvironmentsResponse(spaceId)
      .flatMap((envs: EnvironmentStat[]) => envs || [])
      .filter((env: EnvironmentStat) => env.attributes.name === environmentName);
  }

  private getEnvironmentsResponse(spaceId: string): Observable<EnvironmentStat[]> {
    if (!this.envsObservables.has(spaceId)) {
      const encSpaceId = encodeURIComponent(spaceId);
      const subject = new ReplaySubject<EnvironmentStat[]>(1);
      const observable = this.pollTimer
        .concatMap(() =>
          this.http.get(this.apiUrl + encSpaceId + '/environments', { headers: this.headers })
            .map((response: Response) => (response.json() as EnvironmentsResponse).data)
            .catch((err: Response) => this.handleHttpError(err))
        );
      this.serviceSubscriptions.push(observable.subscribe(subject));
      this.envsObservables.set(spaceId, subject);
    }
    return this.envsObservables.get(spaceId);
  }

  private handleHttpError(response: Response): Observable<any> {
    this.errorHandler.handleError(response);
    this.logger.error(response);
    this.notifications.message({
      type: NotificationType.DANGER,
      header: `Request failed: ${response.status} (${response.statusText})`,
      message: response.text()
    } as Notification);
    return Observable.empty();
  }
}
