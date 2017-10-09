import { Component } from '@angular/core';
import { ForgeService } from 'app/space/forge-wizard/forge.service';
import { Gui, Input, MetaData } from 'app/space/forge-wizard/gui.model';
import { CodebasesService } from '../create/codebases/services/codebases.service';
import { Codebase } from '../create/codebases/services/codebase';
import { ContextService } from '../../shared/context.service';
import { Observable } from 'rxjs/Rx';
import { Notifications } from 'ngx-base';
import { AbstractWizard } from 'app/space/forge-wizard/abstract-wizard.component';
import { configureSteps } from './import-wizard.config';

@Component({
  selector: 'import-wizard',
  templateUrl: './import-wizard.component.html',
  styleUrls: ['./import-wizard.component.less']
})
export class ForgeImportWizardComponent extends AbstractWizard {

  constructor(forgeService: ForgeService,
              codebasesService: CodebasesService,
              context: ContextService,
              notifications: Notifications) {
    super(forgeService, codebasesService, context, notifications);
    this.endPoint = 'fabric8-import-git';
    this.steps = configureSteps();
    this.isLoading = true;
    this.EXECUTE_STEP_INDEX = this.steps[6].priority - 1;
    this.LAST_STEP = this.steps[7].priority - 1;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadUi().then(gui => {
      this.steps[3].disabled = gui.metadata.name
        === 'io.fabric8.forge.generator.github.GithubImportPickRepositoriesStep';
      this.steps[3].nextEnabled = true;
      this.wizard.goToStep(0, true);
      this.isLoading = false;
    }).catch(error => {
      this.isLoading = false;
      this.error = error;
    });
  }

  executeStep(wizardSteps = this.wizard.steps): void {
    this.isLoading = true;
    this.wizard.config.nextTitle = 'Ok';
    wizardSteps[this.LAST_STEP].config.nextEnabled = false;
    wizardSteps[this.LAST_STEP].config.previousEnabled = false;
    wizardSteps.map(step => step.config.allowClickNav = false);
    // special case of last step, you can't navigate using step navigation
    this.wizard.steps.map(step => step.config.allowClickNav = false);
    this.forgeService.executeStep('fabric8-import-git', this.history).then((gui: Gui) => {
      this.result = gui[6] as Input;
      let newGui = this.augmentStep(gui);
      this.isLoading = false;
      wizardSteps[this.LAST_STEP].config.nextEnabled = true;
      console.log('Response from execute' + JSON.stringify(gui));
    }).catch(error => {
      this.isLoading = false;
      this.error = error;
    });
  }

  addCodebaseDelegate(spaceId: string, code: Codebase): Observable<Codebase> {
    return this.codebasesService.addCodebase(spaceId, code);
  }

}

