import {
  Component,
  ContentChild,
  Input,
  OnInit, TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Feature, FeatureTogglesService } from '../service/feature-toggles.service';

@Component({
  selector: 'f8-feature-toggle',
  template: `<ng-content *ngIf="isEnabled"></ng-content>`
})
export class FeatureToggleComponent implements OnInit {
  @Input() featureName: string;
  // @ViewChild('container', { read: ViewContainerRef })
  // container: ViewContainerRef;

  features: Feature[];
  isEnabled = false;

  // TODO: investigate https://angular.io/guide/dynamic-component-loader
  // as we may not want to load feature component if not toggled
  constructor(
    private featureService: FeatureTogglesService
  ) {

  }

  ngOnInit() {
    if (!this.featureName) {
      throw new Error('Attribute `featureName` should not be null or empty');
    }
    this.checkIfContentShouldBeRendered();
  }


  private checkIfContentShouldBeRendered() {
    const toggleState = this.featureService.getFeature(this.featureName).subscribe(f => {
      console.log('>>>>>>>>feature==' + JSON.stringify(f));
      this.isEnabled = f.attributes.enabled && f.attributes['user-enabled'];
    },
    err => {
      this.isEnabled = false;
      console.log('This feature is not accessible in fabric8-toggles-service' + err);
    });

  }
}
