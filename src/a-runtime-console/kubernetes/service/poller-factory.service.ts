import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs-compat';
import { Observable } from 'rxjs-compat';
import { Poller } from './poller';

@Injectable()
export class PollerFactory {

  constructor(
  ) {}

  newInstance<L>(pollListFactory: () => Observable<L>, dataStream: BehaviorSubject<any>) {
    return new Poller(pollListFactory, dataStream);
  }
}
