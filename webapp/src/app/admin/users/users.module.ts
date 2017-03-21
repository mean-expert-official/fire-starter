import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UiModule } from '../../ui/ui.module';

import { UsersComponent } from './users.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ListItemComponent } from './list-item/list-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
  ],
  declarations: [
    UsersComponent,
    ListComponent,
    FormComponent,
    ListItemComponent,
  ],
  exports: [
    UsersComponent
  ],
})
export class UsersModule { }
