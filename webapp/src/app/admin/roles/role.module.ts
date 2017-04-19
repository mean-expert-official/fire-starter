import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UiModule } from '../../ui/ui.module';

import { RoleComponent } from './role.component';
import { RoleFormComponent } from './form/role-form.component';
import { ViewUsersComponent } from './form/view-users.component';

import { RoleService } from './role.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
  ],
  declarations: [
    RoleComponent,
    RoleFormComponent,
    ViewUsersComponent
  ],
  entryComponents: [
    RoleFormComponent,
    ViewUsersComponent
  ],
  exports: [
    RoleComponent,
  ],
  providers: [
    RoleService
  ]
})
export class RoleModule { }
