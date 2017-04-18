import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavItem } from '../ui.service';

@Component({
  selector: 'app-card',
  styles: [`
    .nav-link {
      color: #fff;
    }
    `],
  template: `
    <div class="my-2">
      <div class="card">
        <div class="card-header bg-primary" *ngIf="title">
          <div class="row align-items-center">
            <div class="col-12 col-md-7">
              <h5 class="card-title text-uppercase text-white mb-0">
                <i *ngIf="icon" [class]="'fa fa-fw fa-' + icon"></i> {{ title }}
              </h5>
              <hr *ngIf="createButton || subTitle">
            </div>
            <div class="col-12 col-md-5">
            <p *ngIf="subTitle" class="card-subtitle lead float-right">{{ subTitle }}</p>
              <button *ngIf="createButton" [class]="createButton.class" (click)="action.emit($event)">
                <i [class]="'fa fa-fw fa-lg fa-' + createButton.icon"></i>
                 {{ createButton.text }}
              </button>
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
export class CardComponent {

  @Input() icon;
  @Input() title;
  @Input() subTitle;
  @Input() createButton;
  @Input() modalTemplate;
  @Input() nav: NavItem[];
  @Output() action = new EventEmitter();

  constructor() {

  }

}
