import {
  Component, Input,
  OnDestroy,
  OnInit
} from '@angular/core';

import 'rxjs/operators/map';
import { AuthenticationService, UserService } from 'ngx-login-client';
import { Subscription } from 'rxjs';

@Component({
  selector: 'feature-warning-page',
  templateUrl: './feature-warning-page.component.html',
  styleUrls: ['./feature-warning-page.component.less']
})
export class FeatureWarningPageComponent implements OnInit, OnDestroy {

  enableFeatures: boolean;
  @Input() level: string;
  profileLink: string;
  private userSubscription: Subscription;

  constructor(private userService: UserService,
  private authService: AuthenticationService) {
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
    this.enableFeatures = false;
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
