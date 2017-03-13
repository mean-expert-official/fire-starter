import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="my-2">
      <div class="card">
        <div class="card-header" *ngIf="title">
          <h4 class="card-title">{{title}}</h4>
          <h6 *ngIf="subTitle" class="card-subtitle">{{subTitle}}</h6>
        </div>
        <div class="card-block">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class CardComponent {

  @Input() title;
  @Input() subTitle;

}
