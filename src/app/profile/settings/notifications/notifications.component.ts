import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { UserService } from 'ngx-login-client';
import { Subscription } from 'rxjs-compat';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: '',
  templateUrl: 'notifications.component.html',
  styleUrls: ['notifications.component.less']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  loggedInUserName: String;
  subscriptions: Subscription[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subscriptions.push(this.userService.loggedInUser.subscribe(
      val => {
        if (val.id) {
          this.loggedInUserName = val.attributes.username;
        } else {
          this.loggedInUserName = '';
        }
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
