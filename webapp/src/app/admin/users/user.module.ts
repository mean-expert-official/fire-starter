import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UiModule } from '../../ui/ui.module';

import { UserComponent } from './user.component';
import { UserFormComponent } from './user-form.component';

import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
  ],
  declarations: [
    UserComponent,
    UserFormComponent,
  ],
  entryComponents: [
    UserFormComponent,
  ],
  exports: [
    UserComponent,
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
