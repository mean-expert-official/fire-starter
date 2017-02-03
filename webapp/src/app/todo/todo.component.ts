import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  template: `
    <app-card>
      <app-todo-list></app-todo-list>
    </app-card>
  `,
})

export class TodoComponent {

}
