// angular
// angular package classes to include at the app level
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// fireloop
// fireloop classes to include at the app level
import { LoopBackConfig } from './shared/sdk/index';
import { SDKBrowserModule } from './shared/sdk/index';
// vendor
// external package classes to include at the app level
import { ToastyModule } from 'ng2-toasty';
import { FormlyModule, FormlyBootstrapModule } from 'ng-formly';
import { FormlyConfig } from './ui/form/formly.config';
// custom
// custom classes to include at the app level
import { AppComponent } from './app.component';
import { AppStoreModule } from './app.store';
import { AppRoutingModule } from './app.routing';
import { AuthModule } from './auth/auth.module';
import { UiModule } from './ui/ui.module';
import { UIService } from './ui/ui.service';
import { FormService } from './ui/form/ui-form.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(FormlyConfig),
    FormlyBootstrapModule,
    NgbModule.forRoot(),
    SDKBrowserModule.forRoot(),
    ToastyModule.forRoot(),
    AppStoreModule,
    AuthModule,
    UiModule,
    AppRoutingModule,
  ],
  exports: [
    ToastyModule,
  ],
  providers: [
    FormService,
    UIService,
    NgbActiveModal,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent,
  ]
})

export class AppModule {

  constructor() {
    const apiConfig = window['apiConfig'];
    LoopBackConfig.setBaseURL(apiConfig.baseUrl);
    LoopBackConfig.setApiVersion(apiConfig.version);
  }
}
