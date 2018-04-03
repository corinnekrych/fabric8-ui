import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'toggle-bar',
  templateUrl: 'toggle-bar.component.html',
  styleUrls: ['toggle-bar.component.less']
})
export class ToggleBarComponent {
  constructor() { }
}
