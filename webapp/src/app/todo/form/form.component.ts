import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../shared/sdk/models/Todo'

@Component({
  selector: 'app-todo-form',
  template: `
    <form (submit)="submit()">
      <div class="input-group">
        <input class="form-control" required name="todo" type="text" [(ngModel)]="todo.text" placeholder="Add Todo" />
        <span class="input-group-btn">
          <button class="btn btn-secondary">Add Todo</button>
        </span>
      </div>
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
