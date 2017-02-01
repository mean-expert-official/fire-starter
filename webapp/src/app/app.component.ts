import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-layout>
      <div class="py-3 my-3">
        <div class="card">
          <div class="card-block">
            <h1 class="text-center py-3 my-3">
              {{title}}
            </h1>
          </div>
        </div>
      </div>
    </app-layout>
  `,
})
export class AppComponent {
  title = 'app works!';
}
