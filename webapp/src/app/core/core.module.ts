import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule, FormlyBootstrapModule } from 'ng-formly';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastyModule } from 'ng2-toasty';

import { FormlyConfig } from './../ui/form/formly.config';
import { FormService } from './../ui/form/ui-form.service';
import { UiService } from './../ui/ui.service';

import { SDKBrowserModule, LoopBackConfig } from './../shared/sdk';

import { AuthModule } from './../auth/auth.module';

import { CoreStoreModule } from './core.store';
import { CoreRoutingModule } from './core.routing';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(FormlyConfig),
    FormlyBootstrapModule,
    SDKBrowserModule.forRoot(),
    CoreStoreModule,
    AuthModule,
    CoreRoutingModule
  ],
  providers: [
    FormService,
    UiService,
    NgbActiveModal
  ]
})
export class CoreModule {
  constructor() {
    const apiConfig = window['apiConfig'];
    LoopBackConfig.setBaseURL(apiConfig.baseUrl);
    LoopBackConfig.setApiVersion(apiConfig.version);
  }
}
