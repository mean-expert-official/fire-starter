import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="py-3 my-3">
      <div class="card">
        <div class="card-block">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class CardComponent {

}
