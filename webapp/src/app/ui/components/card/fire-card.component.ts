import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavItem } from '../../ui.service';

@Component({
  selector: 'fire-card',
  styles: [`
    .nav-link {
      color: #fff;
    }
    `],
  template: `
  <div class="my-2">
    <div class="card">
      <div *ngIf="cardTitle" class="card-header bg-primary">
        <div class="row align-items-center">
          <div class="col-12 col-md-7">
            <h4 class="card-title text-uppercase text-white mb-0">
              <i *ngIf="icon" [class]="'fa fa-fw fa-' + icon"></i> {{ cardTitle }}
            </h4>
            <hr *ngIf="createButton || subTitle || nav">
          </div>
          <div class="col-12 col-md-5">
            <button *ngIf="createButton" [class]="createButton.class" (click)="handleAction({ type: createButton.action || 'create', payload: payload || '' })">
              <i [class]="'fa fa-fw fa-lg fa-' + createButton.icon"></i>
               {{ createButton.text }}
            </button>
            <p *ngIf="subTitle" class="card-subtitle lead float-right">{{ subTitle }}</p>
          </div>
          <div *ngIf="nav" class="col-12">
            <ul class="nav nav-tabs card-header-tabs">
              <li *ngFor="let item of nav" class="nav-item">
                <a [routerLink]="item.link" routerLinkActive="active" class="nav-link">
                  <i *ngIf="item.icon" [class]="'fa fa-fw fa-' + item.icon"></i>
                  {{ item.name }}
                </a>
              </li>
            </ul>
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
export class FireCardComponent {

  @Input() icon;
  @Input() cardTitle;
  @Input() subTitle;
  @Input() createButton;
  @Input() payload;
  @Input() modalTemplate;
  @Input() nav: NavItem[];
  @Output() action = new EventEmitter();

  constructor() { }

  handleAction(event) {
    switch (event.type) {
      default:
        return this.action.emit(event);
    }
  }

}
