import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ToastyModule } from 'ng2-toasty';

import { SDKBrowserModule } from './shared/sdk/index';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AppSoreModule } from './app.store';

import { TodoModule } from './todo/todo.module';
import { UiModule } from './ui/ui.module';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';
import { NoteModule } from './note/note.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SDKBrowserModule.forRoot(),
    ToastyModule.forRoot(),

    AppRoutingModule,
    AppSoreModule,

    NoteModule,
    TodoModule,
    AuthModule,
    NotificationsModule,
    UiModule,
  ],
  exports: [
    ToastyModule,
  ],
  providers: [
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
})

export class AppModule { }
