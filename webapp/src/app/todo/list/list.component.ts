import { Component } from '@angular/core';
import { Todo } from '../../shared/sdk/models/Todo'
import { FireLoopRef } from '../../shared/sdk/models/FireLoopRef'
import { RealTime } from '../../shared/sdk/services/core/real.time'

@Component({
  selector: 'app-todo-list',
  template: `
    <app-todo-form (create)="create($event)"></app-todo-form>
    <ul *ngIf="todoRef" class="list-unstyled mb-0 mt-3 px-3">
      <li *ngFor="let todo of todos">
        <app-todo-list-item (update)="update($event)" (remove)="remove($event)" [todo]="todo"></app-todo-list-item>
      </li>
    </ul>
  `,
})
export class ListComponent {

  private todos: Todo[] = new Array<Todo>();
  private todoRef: FireLoopRef<Todo>;

  constructor(private rt: RealTime) {
    this.rt.onReady().subscribe(() => {
      this.todoRef = this.rt.FireLoop.ref<Todo>(Todo);
      this.todoRef.on('change').subscribe((todos: Todo[]) => this.todos = todos);
      this.todoRef.stats().subscribe((stats: any) => {
        let data = new Array();
        stats.forEach((stat: any) => {
          data.push(stat.count);
        });
      });
    });
  }

  create(todo: Todo): void {
    this.todoRef.create(todo).subscribe();
  }

  update(todo: Todo): void {
    this.todoRef.upsert(todo).subscribe();
  }

  remove(todo: Todo): void {
    this.todoRef.remove(todo).subscribe();
  }

}
