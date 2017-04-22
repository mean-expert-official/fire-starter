import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FormlyModule, FormlyBootstrapModule } from "ng-formly";
import { NgbModule, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastyModule } from "ng2-toasty";

import { FormlyConfig } from "./../ui/form/formly.config";
import { FormService } from "./../ui/form/ui-form.service";
import { UiService } from "./../ui/ui.service";

import { SDKBrowserModule, LoopBackConfig } from "./../shared/sdk";

import { AuthModule } from "./../auth/auth.module";

import { CoreStoreModule } from "./core.store";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: 'app/home/home.module#HomeModule' },
      { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
    ]
  }
];

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
    RouterModule.forRoot(routes)
  ],
  providers : [
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
