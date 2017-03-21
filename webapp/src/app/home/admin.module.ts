import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SDKBrowserModule } from '../shared/sdk/index';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing';
import { UiModule } from '../ui/ui.module';

<<<<<<< HEAD
=======
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

>>>>>>> base of admin module
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // NgbModule,
<<<<<<< HEAD
    SDKBrowserModule,
    UiModule,
=======
    SDKBrowserModule
    UiModule,
    DashboardModule,
    UsersModule,
    RolesModule,
>>>>>>> base of admin module
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
