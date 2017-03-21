import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="my-2">
      <div class="card">
        <div class="card-header" *ngIf="title">
          <div class="row align-items-center">
            <div class="col-8">
              <h4 class="card-title text-uppercase" [class.mb-0]="!subTitle">
                <i *ngIf="icon" [class]="'text-primary fa fa-fw fa-' + icon"></i>
                {{ title }}
              </h4>
              <p *ngIf="subTitle" class="card-subtitle lead">
                {{ subTitle }}
              </p>
            </div>
            <div *ngIf="createButton" class="col-4">
              <button [class]="createButton.class"
                (click)="action.emit($event)">
                <i [class]="'fa fa-' + createButton.icon"></i>
                &nbsp; {{ createButton.text }}
              </button>
            </div>
          </div>
        </div>
        <div class="card-block">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class CardComponent {

  @Input() icon;
  @Input() title;
  @Input() subTitle;
  @Input() createButton;
  @Input() modalTemplate;
  @Output() action = new EventEmitter();

  constructor() {

  }

}
