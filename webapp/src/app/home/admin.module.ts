import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SDKBrowserModule } from '../shared/sdk/index';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing';
import { UiModule } from '../ui/ui.module';

<<<<<<< HEAD
<<<<<<< HEAD
=======
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

>>>>>>> base of admin module
=======
>>>>>>> fix missing modules and karma config for testing
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // NgbModule,
<<<<<<< HEAD
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
=======
    SDKBrowserModule,
    UiModule,
>>>>>>> fix missing modules and karma config for testing
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
