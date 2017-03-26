import { Component, OnInit } from '@angular/core';
import { RealTime } from '../../shared/sdk/services/core/real.time';
import { FireLoopRef } from '../../shared/sdk/models';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home-dashboard',
  template: `
    <app-card icon="tachometer" title="Dashboard">
      <div class="row">
        <div *ngFor="let item of dashCards" class="col-12 col-lg-4">
          <a class="dash-card" [routerLink]="item.link">
            <div class="card">
              <h5 class="card-header text-center" [style.color]="'#fff'">{{ item.title }}</h5>
              <div class="card-block text-center">
                <i [class]="'fa fa-fw fa-3x fa-' + item.icon"></i>
                <h4><span class="badge badge-primary">{{ item.data | number }}</span></h4>
              </div>
            </div>
          </a>
        </div>
      </div>
    </app-card>
  `,
  styleUrls: ['../home.component.scss']
})

export class DashboardComponent implements OnInit {

  dashCards: any = [];

  constructor() {

  }

  ngOnInit() {
    this.dashCards = [
      {
        'title': 'Todos',
        'link': '/home/todos',
        'icon': 'check-square-o',
        'data': 0
      },
      {
        'title': 'Notes',
        'link': '/home/notes',
        'icon': 'sticky-note-o',
        'data': 0
      },
      {
        'title': 'Notifications',
        'link': '/home/notifications',
        'icon': 'comments-o',
        'data': 0
      },
    ]
  }

}
