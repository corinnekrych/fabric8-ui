import { Component, InjectionToken, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'ngx-login-client';
import { Observable, Subscription } from 'rxjs';

import { ResourceService } from '../services/resource.service';
import { CpuStat } from './../../../space/create/deployments/models/cpu-stat';
import { MemoryStat } from './../../../space/create/deployments/models/memory-stat';

enum CLASSES {
  ICON_OK = 'pficon-ok',
  ICON_WARN = 'pficon-warning-triangle-o',
  ICON_ERR = 'pficon-error-circle-o'
}

const DUMMY_UUID = 'f461b06c-3833-11e8-b467-0ed5f89f718b';

const PROJECT_ENTRY_TEMPLATE = {
  mem: {
    quota: 0,
    used: 0
  },
  cpu: {
    quota: 0,
    used: 0
  },
  icon: CLASSES.ICON_OK
};

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: '',
  templateUrl: 'resources.component.html',
  styleUrls: ['./resources.component.less'],
  providers: [
    ResourceService
  ]
})
export class ResourcesComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  projectInfo: Object = {};
  projectNames: string[] = [];

  constructor(
    private resourceService: ResourceService,
    private userService: UserService
  ) { }

  ngOnInit() {
    let loggedInUser = this.userService.currentLoggedInUser.attributes.username;

    this.subscriptions.push(this.resourceService.getEnvironments().subscribe(
      (projNames) => {

        projNames.forEach((projName) => {
          let name = (projName === 'test') ? loggedInUser : loggedInUser + '/' + projName;
          this.projectNames.push(name);

          this.projectInfo[name] = PROJECT_ENTRY_TEMPLATE;

          this.subscriptions.push(
            this.resourceService.getEnvironmentMemoryStat(DUMMY_UUID, projName)
              .subscribe((stat) => {
                this.projectInfo[name].mem.used = stat.used;
                this.projectInfo[name].mem.quota = stat.quota;
              })
          );

          this.subscriptions.push(
            this.resourceService.getEnvironmentCpuStat(DUMMY_UUID, projName)
              .subscribe((stat) => {
                this.projectInfo[name]['cpu']['used'] = stat.used;
                this.projectInfo[name]['cpu']['quota'] = stat.quota;
              })
          );

          let cpu_ratio = this.projectInfo[name].cpu.used / this.projectInfo[name].cpu.quota;
          let mem_ratio = this.projectInfo[name].mem.used / this.projectInfo[name].mem.quota;

          if (cpu_ratio == 1 || mem_ratio == 1) {
            this.projectInfo[name].icon = CLASSES.ICON_ERR;
          } else if (cpu_ratio >= .6 || mem_ratio >= .6) {
            this.projectInfo[name].icon = CLASSES.ICON_WARN;
          } else {
            this.projectInfo[name].icon = CLASSES.ICON_OK;
          }
        });
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
