import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../shared/sdk/models/Todo'

@Component({
  selector: 'app-todo-list-item',
  template: `
    <div class="row my-2">
      <div class="input-group">
        <span class="input-group-addon">
          <input type="checkbox" name="todo.done" [(ngModel)]="todo.done" disabled="true" />
        </span>
        <input class="form-control" name="todo.id" [(ngModel)]="todo.text" [disabled]="todo.done" />
        <span class="input-group-btn">
          <button class="btn btn-secondary btn-sm" (click)="update.emit(todo)" [disabled]="todo.done">Save</button>
        </span>
        <span class="input-group-btn">
          <button class="btn btn-secondary btn-sm" (click)="done.emit(todo)">Done</button>
        </span>
        <span class="input-group-btn">
          <button class="btn btn-secondary btn-sm" (click)="remove.emit(todo)">Remove</button>
        </span>
      </div>
    </div>
  `,
})
export class ListItemComponent {

  @Input() public todo: Todo;

  @Output() update = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() done = new EventEmitter();

}
