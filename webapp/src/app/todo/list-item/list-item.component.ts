import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../shared/sdk/models/Todo'

@Component({
  selector: 'app-todo-list-item',
  template: `
    <div class="row my-2">
      <div class="input-group">
        <span class="input-group-btn">
          <button class="btn btn-default btn-sm" (click)="update.emit(todo)">Update</button>
        </span>
        <input class="form-control" name="todo.id" [(ngModel)]="todo.text" />
        <span class="input-group-btn">
          <button class="btn btn-default btn-sm" (click)="remove.emit(todo)">Remove</button>
        </span>
      </div>
    </div>
  `,
})
export class ListItemComponent {

  @Input() public todo: Todo;

  @Output() update = new EventEmitter();
  @Output() remove = new EventEmitter();

}
