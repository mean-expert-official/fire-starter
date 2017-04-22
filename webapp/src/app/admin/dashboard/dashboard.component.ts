import { Component, OnInit, OnDestroy } from '@angular/core';
import { Account, Role, ACL } from '../../shared/sdk/models';
import { AccountApi, RoleApi, ACLApi } from '../../shared/sdk/services';
import { Subscription } from 'rxjs/Subscription';
import { DashCard } from '../../ui/ui.service';

@Component({
  selector: 'fire-admin-dashboard',
  template: `
    <fire-card icon="tachometer" title="Dashboard">
      <div *ngIf="dashCards" class="row align-items-center justify-content-center">
        <div *ngFor="let item of dashCards" class="col-6 col-lg-4">
          <a class="dash-card" [routerLink]="item.link">
            <div class="card card-outline-primary mb-3">
              <h5 class="card-title text-center mb-0">{{ item.name }}</h5>
              <div class="card-block text-center">
                <div class="card-center">
                  <i [class]="'fa fa-fw fa-3x fa-' + item.icon"></i>
                </div>
                <h4><span class="badge badge-primary">{{ item.data | number }}</span></h4>
              </div>
            </div>
          </a>
        </div>
      </div>
    </fire-card>
  `,
  styleUrls: ['../admin.component.scss']
})

export class DashboardComponent implements OnDestroy {
  public dashCards: DashCard[] = [];
  public userCount: number;
  public roleCount: number;
  public controlCount: number;
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    public accountApi: AccountApi,
    public roleApi: RoleApi,
    public controlApi: ACLApi,
  ) {
    this.subscriptions.push(this.accountApi.count().subscribe(
      (users: { count: number }) => {
        this.userCount = users.count;
        this.setDashCards();
      }));
    this.subscriptions.push(this.roleApi.count().subscribe(
      (roles: { count: number }) => {
        this.roleCount = roles.count;
        this.setDashCards();
      }));
    this.subscriptions.push(this.controlApi.count().subscribe(
      (controls: { count: number }) => {
        this.controlCount = controls.count;
        this.setDashCards();
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  setDashCards() {
    this.dashCards = [
      {
        name: 'Users',
        icon: 'users',
        data: this.userCount,
        link: '/admin/users'
      },
      {
        name: 'Roles',
        icon: 'tags',
        data: this.roleCount,
        link: '/admin/roles'
      },
      {
        name: 'Controls',
        icon: 'ban',
        data: this.controlCount,
        link: '/admin/controls'
      }
    ]
  }

}
