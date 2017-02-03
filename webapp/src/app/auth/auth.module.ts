import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component'
import { UiModule } from '../ui/ui.module'

@NgModule({
  imports: [
    CommonModule,
    UiModule,
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
  ],
  exports: [
    AuthComponent,
  ]
})
export class AuthModule { }
