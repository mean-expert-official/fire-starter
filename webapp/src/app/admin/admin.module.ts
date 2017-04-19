import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthModule } from '../auth/auth.module';
import { AdminRoutingModule } from './admin.routing';
import { UiModule } from '../ui/ui.module';
import { UserModule } from './users/user.module';
import { RoleModule } from './roles/role.module';
import { ControlModule } from './controls/control.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    AuthModule,
    UserModule,
    RoleModule,
    ControlModule,
    AdminRoutingModule
  ],
  exports: [

  ],
  providers: [

  ],
  declarations: [
    AdminComponent,
    DashboardComponent
  ],
})

export class AdminModule { }
