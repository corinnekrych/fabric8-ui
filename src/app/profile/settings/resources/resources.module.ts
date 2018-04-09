import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs';

import {
  ResourceService,
  TIMER_TOKEN,
  TIMESERIES_SAMPLES_TOKEN
} from '../services/resource.service';
import { ResourceStatusIcon } from './resource-status-icon.component';
import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesComponent } from './resources.component';

const DEPLOYMENTS_SERVICE_POLL_TIMER = Observable
  .timer(ResourceService.INITIAL_UPDATE_DELAY, ResourceService.POLL_RATE_MS)
  .share();

@NgModule({
  imports: [
    CommonModule,
    ResourcesRoutingModule
  ],
  declarations: [ ResourcesComponent, ResourceStatusIcon ],
  providers: [
    { provide: TIMER_TOKEN, useValue: DEPLOYMENTS_SERVICE_POLL_TIMER },
    { provide: TIMESERIES_SAMPLES_TOKEN, useValue: 15 }
  ]
})
export class ResourcesModule {
  constructor(http: Http) {}
}
