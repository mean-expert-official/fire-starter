import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';
import { UiModule } from '../ui/ui.module';
import { StatusComponent } from './status/status.component';
import { AuthEffects } from '../store/effects/auth';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    RouterModule,
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    StatusComponent,
  ],
  exports: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
  ],
  providers: [
    AuthEffects,
  ]
})
export class AuthModule { }
