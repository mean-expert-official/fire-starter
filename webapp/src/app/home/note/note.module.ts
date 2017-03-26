import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UiModule } from '../../ui/ui.module';

import { NoteComponent } from './note.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
  ],
  declarations: [
    FormComponent,
    ListComponent,
    ListItemComponent,
    NoteComponent,
  ],
  exports: [
    NoteComponent
  ],
})
export class NoteModule { }
