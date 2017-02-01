import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ListItemComponent } from './list-item/list-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    ListComponent,
    FormComponent,
    ListItemComponent,
  ],
  exports: [
    ListComponent,
  ],
})
export class TodoModule { }
