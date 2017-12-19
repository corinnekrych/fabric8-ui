import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AuthenticationService } from 'ngx-login-client';
import { Logger } from 'ngx-base';
import { Observable } from 'rxjs';
import { FABRIC8_FEATURE_TOGGLES_API_URL } from '../../../a-runtime-console/shared/feature-toggles.provider';
import { Location } from '@angular/common';

@Injectable()
export class FeatureTogglesService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private featureTogglesUrl: string;

  constructor(
    private http: Http,
    private logger: Logger,
    private auth: AuthenticationService,
    @Inject(FABRIC8_FEATURE_TOGGLES_API_URL) apiUrl: string) {
    if (this.auth.getToken() != null) {
      this.headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    }
    this.featureTogglesUrl = apiUrl;
  }

  /**
   * Get the features enabled for a given user (the user identity being carried with auth token).
   *
   * @returns {Observable<Feature[]>}
   */
  getFeatures(): Observable<Feature[]> {
    let url = Location.stripTrailingSlash(this.featureTogglesUrl || '') + '/features';
    return this.http.get(url, { headers: this.headers })
      .map((response) => {
        return response.json().data as Feature[];
      })
      .catch((error) => {
        return this.handleError(error);
      });
  }

  /**
   * Check if a given feature id is enabled.
   * If enabled for a given user (the user identity being carried with auth token).
   *
   * @returns {Observable<Feature>}
   */
  getFeature(id: string): Observable<Feature> {
    let url = Location.stripTrailingSlash(this.featureTogglesUrl || '') + '/features/' + id;
    return this.http.get(url, { headers: this.headers })
      .map((response) => {
        return response.json().data as Feature;
      })
      .catch((error) => {
        return this.handleError(error);
      });
  }

  private handleError(error: any) {
    this.logger.error(error);
    return Observable.throw(error.message || error);
  }
}
export class Feature {
  attributes: FeatureAttributes;
  id?: string;
}

export class FeatureAttributes {
  'name': string;
  'description'?: string;
  'enabled'?: boolean;
  'enablement-level'?: string;
  'user-enabled'?: boolean;
}
