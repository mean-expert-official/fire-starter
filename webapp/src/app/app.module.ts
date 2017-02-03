import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SDKBrowserModule } from './shared/sdk/index';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { TodoModule } from './todo/todo.module'
import { UiModule } from './ui/ui.module'
import { AuthModule } from './auth/auth.module'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SDKBrowserModule.forRoot(),

    AppRoutingModule,

    TodoModule,
    AuthModule,
    UiModule,
  ],
  providers: [
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent,
  ]
})

export class AppModule { }
