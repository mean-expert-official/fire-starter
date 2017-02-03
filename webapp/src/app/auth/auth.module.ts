import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component'
import { UiModule } from '../ui/ui.module'
import { StatusComponent } from './status/status.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    StatusComponent,
  ],
  exports: [
    AuthComponent,
  ]
})
export class AuthModule { }
