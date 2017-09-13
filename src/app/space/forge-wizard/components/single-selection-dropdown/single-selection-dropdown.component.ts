import { Component, Input, OnInit } from '@angular/core';
import { Input as GuiInput } from 'app/space/forge-wizard/gui.model';

@Component({
  selector: 'single-selection-dropdown',
  templateUrl: './single-selection-dropdown.component.html',
  styleUrls: [ './single-selection-dropdown.component.less' ]
})
export class SingleSelectionDropDownComponent implements OnInit {

  @Input() field: GuiInput;
  constructor() {}

  ngOnInit() {
    // console.log("::::::::::::::Single-Selection-Dropdown field ngInit"+JSON.stringify(this.field));
    this.field.display = {open: false};
  }

}
