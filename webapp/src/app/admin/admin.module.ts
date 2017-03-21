import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing';
import { UiModule } from '../ui/ui.module';

import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // NgbModule,
    UiModule,
    DashboardModule,
    UsersModule,
    RolesModule,
    AdminRoutingModule
  ],
  exports: [
  ],
  providers: [

  ],
  declarations: [
    AdminComponent
  ],
})

export class AdminModule { }
