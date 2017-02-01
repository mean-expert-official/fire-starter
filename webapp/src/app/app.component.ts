import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-layout>
      <div class="py-3 my-3">
        <div class="card">
          <div class="card-block">
            <app-todo-list></app-todo-list>
          </div>
        </div>
      </div>
    </app-layout>
  `,
})
export class AppComponent {
}
