import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="my-2">
      <div class="card">
        <div class="card-header" *ngIf="title">{{title}}</div>
        <div class="card-block">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class CardComponent {

  @Input() title;

}
