import { Component, Input, OnInit } from '@angular/core';
import { Input as GuiInput } from 'app/space/forge-wizard/gui.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'single-input',
  templateUrl: './single-input.component.html',
  styleUrls: ['./single-input.component.less']
})
export class SingleInputComponent implements OnInit {

  @Input() field: GuiInput;
  @Input() form: FormGroup;

  constructor() {}

  ngOnInit() {
    if (!this.field.enabled) {
      this.form.controls.jenkinsSpace.disable();
    }
    console.log(`::::SingleInputComponent ngOnInit: ${JSON.stringify(this.field)}`);
  }

}

