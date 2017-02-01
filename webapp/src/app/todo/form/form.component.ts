import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../shared/sdk/models/Todo'

@Component({
  selector: 'app-todo-form',
  template: `
    <form (submit)="submit()">
      <div class="form-group">
        <input class="form-control" required name="todo" type="text" [(ngModel)]="todo.text" placeholder="Add Todo" />
      </div>
      <div class="form-group">
        <input class="form-control" required name="todo" type="date" [(ngModel)]="todo.dueAt" placeholder="Due Date" />
      </div>
      <button class="btn btn-default">Add Todo</button>
    </form>
  `,
})
export class FormComponent {

  public todo: Todo = new Todo();

  submit() {
    this.create.emit(this.todo);
    this.todo = new Todo();
  }

  @Output() create = new EventEmitter();
}
