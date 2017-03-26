import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UiModule } from '../../ui/ui.module';

import { TodoComponent } from './todo.component';
import { TodoFormComponent } from './todo-form.component';

import { TodoService } from './todo.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
  ],
  declarations: [
    TodoComponent,
    TodoFormComponent,
  ],
  entryComponents: [
    TodoFormComponent,
  ],
  exports: [
    TodoComponent,
  ],
  providers: [
    TodoService
  ]
})
export class TodoModule { }
