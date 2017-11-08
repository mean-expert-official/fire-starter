import 'rxjs/add/operator/map';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import * as Admin from '../state/reducers/admin.reducers';
import { DashCard } from '../../ui/ui.service';

@Component({
  selector: 'fire-admin-dashboard',
  template: `
    <fire-card icon="tachometer" cardTitle="Dashboard">
      <div *ngIf="dashCards" class="row align-items-center justify-content-center">
        <div *ngFor="let item of dashCards" class="col-6 col-lg-4">
          <a class="dash-card" [routerLink]="item.link">
            <div class="card card-outline-primary mb-3">
              <h4 class="card-title text-center mb-0">{{ item.name }}</h4>
              <div class="card-block text-center">
                <div class="card-center">
                  <i [class]="'fa fa-fw fa-3x fa-' + item.icon"></i>
                </div>
                <h4 *ngIf="item.data"><span class="badge badge-primary">{{ item.data | async }}</span></h4>
              </div>
            </div>
          </a>
        </div>
      </div>
    </fire-card>
  `,
  styleUrls: ['../admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DashboardComponent implements OnDestroy {
  public dashCards: DashCard[];
  public adminState;
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private store: Store<any>,
  ) {
    this.adminState = this.store.select('admin');
    this.setDashCards();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  setDashCards() {
    this.dashCards = [
      {
        name: 'Users',
        icon: 'users',
        data: this.adminState.map(a => a.users.ids.length),
        link: '/admin/users'
      },
      {
        name: 'Roles',
        icon: 'tags',
        data: this.adminState.map(a => a.roles.ids.length),
        link: '/admin/roles'
      },
      {
        name: 'Controls',
        icon: 'ban',
        data: this.adminState.map(a => a.controls.ids.length),
        link: '/admin/controls'
      }
    ]
  }

}
