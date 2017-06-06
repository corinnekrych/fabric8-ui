import { ViewEncapsulation, Component, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
//
import { ILoggerDelegate, LoggerFactory } from '../../common/logger';
import { INotifyPropertyChanged } from '../../core/component';

import { IWorkflow, IWorkflowTransition, WorkflowTransitionAction } from '../../models/workflow';

import {
  IField,
  IFieldChoice
} from '../../services/app-generator.service';

import { ForgeAppGeneratorServiceClient } from './forge-app-generator-service-client';
import { FieldWidgetClassificationOptions } from '../../models/contracts/field-classification';

@Component({
  host: {
   'class': 'wizard-step'
  },
  // ensure that dynamically added html message get styles applied
  encapsulation: ViewEncapsulation.None,

  selector: 'forge-app-generator',
  templateUrl: './forge-app-generator.component.html',
  styleUrls: [ './forge-app-generator.component.scss' ],
  providers: [
    ForgeAppGeneratorServiceClient.factoryProvider
  ]
})
export class ForgeAppGeneratorComponent implements OnInit, OnDestroy, OnChanges {

  // keep track of the number of instances
  static instanceCount: number = 1;

  @Input() title: string = 'Forge Wizard';
  @Input() workflowStepName: string = '';
  @Input() forgeCommandName: string = 'none';

  private _workflow: IWorkflow;

  constructor(
    public forgeClient: ForgeAppGeneratorServiceClient,
    loggerFactory: LoggerFactory) {
    let logger = loggerFactory.createLoggerDelegate(this.constructor.name, ForgeAppGeneratorComponent.instanceCount++);
    if ( logger ) {
      this.log = logger;
    }
    this.log(`New instance ...`);
  }

  @Input()
  get workflow(): IWorkflow {
    return this._workflow;
  }

  set workflow(value: IWorkflow) {
    this._workflow = value;
  }

  /**
   * All inputs are bound and values assigned, but the 'workflow' get a new instance every time the parents host dialog
   * is opened.
   */
  ngOnInit() {
    this.log(`ngOnInit ...`);
    this.forgeClient.commandName = this.forgeCommandName;
    this.forgeClient.workflow = this.workflow;
  }

  ngOnDestroy() {
    this.log(`ngOnDestroy ...`);
  }

  /** handle all changes to @Input properties */
  ngOnChanges(changes: SimpleChanges) {
    for ( let propName in changes ) {
      if ( changes.hasOwnProperty(propName) ) {
        this.log(`ngOnChanges ... ${propName}`);
        switch ( propName.toLowerCase() ) {
          case 'workflow': {
            let change: INotifyPropertyChanged<IWorkflow> = <any>changes[ propName ];
            this.onWorkflowPropertyChanged(change);
            break;
          }
          default : {
            break;
          }
        }
      }
    }
  }


  trackByFn(index: any, item: any) {
   return index;
  }

  private onWorkflowPropertyChanged(change?: INotifyPropertyChanged<IWorkflow>) {
    if ( change ) {
      if ( change.currentValue !== change.previousValue ) {
        this.log(`The workflow property changed value ...`);
        let current: IWorkflow = change.currentValue;
        this.forgeClient.workflow = current;
        this.subscribeToIncomingWorkflowTransitions(current);
        this.subscribeToOutgoingWorkflowTransitions(current);
      }
    }
  }
  private subscribeToOutgoingWorkflowTransitions(workflow: IWorkflow) {
    if ( !workflow ) {
      return;
    }
    workflow.transitions.filter(transition => transition.isTransitioningFrom(this.workflowStepName))
    .subscribe((transition) => {
      switch ( transition.action ) {
        case WorkflowTransitionAction.NEXT: {
          // moving from this point in the workflow as the result of a nextStep transition
          break;
        }
        case WorkflowTransitionAction.GO: {
          // moving from this point in the workflow as the result of a goToStep transition
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  private subscribeToIncomingWorkflowTransitions(workflow: IWorkflow) {
    if ( !workflow ) {
      return;
    }
    workflow.transitions.filter(transition => transition.isTransitioningTo(this.workflowStepName))
    .subscribe((transition) => {
      this.forgeClient.begin();
    });
  }

  /** logger delegate delegates logging to a logger */
  private log: ILoggerDelegate = () => {};

}

