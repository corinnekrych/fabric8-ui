import { Observable } from 'rxjs';
import { AuthenticationService } from 'ngx-login-client';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { FeatureFlagConfig } from '../../models/feature-flag-config';
import { FeatureTogglesService } from '../service/feature-toggles.service';
import { Logger } from 'ngx-base';

enum FeatureLevel {
  internal = 'internal',
  notApplicable = 'notApplicable', // non redhat user trying to access internal feature
  systemError = 'systemError', // f8-toggles-service is down, this features is disabled by PM for all level
  notLoggedIn = 'notLoggedIn',
  experimental = 'experimental',
  beta = 'beta'
}
@Injectable()
export class FeatureFlagResolver implements Resolve<FeatureFlagConfig> {

  constructor(private logger: Logger,
              private authService: AuthenticationService,
              private toggleService: FeatureTogglesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FeatureFlagConfig> {

    let featureName = route.data['featureName'];

    if (this.authService.isLoggedIn()) {
      return this.toggleService.getFeature(featureName).map((feature) => {
        this.logger.log('>> Feature = ' + featureName + ' enabled = ' + feature.attributes['enabled']);
        if (!feature.attributes['enabled']) { // PM has disabled the feature for all users
          return {
            name: featureName,
            showBanner: FeatureLevel.notApplicable,
            enabled: false
          } as FeatureFlagConfig;
        } else return { // feature is not toggled off, check user's level
          name: featureName,
          showBanner: this.getBannerColor(feature.attributes['enablement-level']),
          enabled: feature.attributes['user-enabled']
        } as FeatureFlagConfig;
      }).catch(err => {
        return Observable.of({
          name: featureName,
          showBanner: FeatureLevel.systemError,
          enabled: true // if the f8-toggles-service is down, make the feature available with a systemError banner
        } as FeatureFlagConfig);
      });
    } else {
      this.logger.log('>> Feature = ' + featureName + ' is NOT enabled for non-logged in user.');
      return Observable.of({
        name: featureName,
        showBanner: FeatureLevel.notLoggedIn,
        enabled: true // TODO: what do we show to non-logged in user? to show or not to show?
      } as FeatureFlagConfig);
    }
  }

  private getBannerColor(level: string): string {
    if (level.toLocaleLowerCase() === 'beta') {
      return FeatureLevel.beta;
    }
    if (level.toLocaleLowerCase() === 'internal') {
      return FeatureLevel.internal;
    }
    if (level.toLocaleLowerCase() === 'experimental') {
      return FeatureLevel.experimental;
    }
    return FeatureLevel.notApplicable;
  }

}
