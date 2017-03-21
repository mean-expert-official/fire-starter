import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastyModule } from 'ng2-toasty';
<<<<<<< HEAD
import { FormlyModule, FormlyBootstrapModule } from 'ng-formly';
import { FormlyConfig } from './ui/form/formly.config';
=======
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
>>>>>>> base of admin module

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { LoopBackConfig } from './shared/sdk/index';
import { SDKBrowserModule } from './shared/sdk/index';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AppStoreModule } from './app.store';

import { UiModule } from './ui/ui.module';
import { UIService } from './ui/ui.service';

import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';
import { NoteModule } from './note/note.module';

import { FormService } from './ui/form/ui-form.service';
import { UIService } from './ui/ui.service';


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
    NgbModule.forRoot(),

    AppStoreModule,

    NoteModule,
    TodoModule,
    AuthModule,
    NotificationsModule,
    UiModule,

    AppRoutingModule,
  ],
  exports: [
    ToastyModule,
  ],
  providers: [
<<<<<<< HEAD
    FormService,
    UIService,
    NgbActiveModal
=======
    UIService
>>>>>>> base of admin module
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
