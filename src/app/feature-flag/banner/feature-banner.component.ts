import {
  Component,
  OnInit,
  OnDestroy, Input
} from '@angular/core';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { UserService, AuthenticationService } from 'ngx-login-client';

@Component({
  selector: 'feature-banner',
  templateUrl: './feature-banner.component.html',
  styleUrls: ['./feature-banner.component.less']
})
export class FeatureBannerComponent implements OnInit, OnDestroy {

  public hideBanner: boolean;
  public profileLink: string;
  private userSubscription: Subscription;
  @Input() level: string;

  constructor(public router: Router,
              userService: UserService,
              authService: AuthenticationService) {

    if (authService.isLoggedIn()) {
      this.userSubscription = userService.loggedInUser.subscribe(val => {
        if (val.id) {
          this.profileLink = '/' + val.attributes.username + '/_update';
        }
      });
    } else {
      this.profileLink = '/_home';
    }
  }

  ngOnInit() {
    this.hideBanner = false;
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  acknowledgeWarning() {
    this.hideBanner = true;
  }
}
