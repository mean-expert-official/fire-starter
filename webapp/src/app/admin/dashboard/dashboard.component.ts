import { Component, OnInit, OnDestroy } from '@angular/core';
import { FireLoopRef, User, Role } from '../../shared/sdk/models';
import { RealTime } from '../../shared/sdk/services/core/real.time';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <app-card icon="tachometer" title="Dashboard">
      <div class="row">
        <div *ngFor="let item of dashCards" class="col-12 col-lg-6">
          <a class="dash-card" [routerLink]="item.link">
            <div class="card mb-3">
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
  styleUrls: ['../admin.component.scss']
})

export class DashboardComponent implements OnDestroy {
  public dashCards: any = [];
  public users: User[] = new Array<User>();
  private userRef: FireLoopRef<User>;
  public roles: Role[] = new Array<Role>();
  private roleRef: FireLoopRef<Role>;
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private rt: RealTime,
  ) {
    this.subscriptions.push(
      this.rt.onReady().subscribe(
        (fire: any) => {
          this.userRef = this.rt.FireLoop.ref<User>(User);
          this.subscriptions.push(this.userRef.on('change').subscribe(
            (users: User[]) => {
              this.users = users;
              this.setDashCards();
            }));
          this.roleRef = this.rt.FireLoop.ref<Role>(Role);
          this.subscriptions.push(this.roleRef.on('change').subscribe(
            (roles: Role[]) => {
              this.roles = roles;
              this.setDashCards();
            }));
        }));
  }

  ngOnDestroy() {
    this.userRef.dispose();
    this.roleRef.dispose();
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  setDashCards() {
    this.dashCards = [
      {
        icon: 'users',
        title: 'Users',
        data: this.users.length,
        link: '/admin/users'
      },
      {
        icon: 'tags',
        title: 'Roles',
        data: this.roles.length,
        link: '/admin/roles'
      }
    ]
  }

}
