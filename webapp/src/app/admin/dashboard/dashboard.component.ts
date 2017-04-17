import { Component, OnInit, OnDestroy } from '@angular/core';
import { FireLoopRef, FireUser, Role, ACL } from '../../shared/sdk/models';
import { RealTime } from '../../shared/sdk/services/core/real.time';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <app-card icon="tachometer" title="Dashboard">
      <div *ngIf="dashCards" class="row">
        <div *ngFor="let item of dashCards" class="col">
          <a class="dash-card" [routerLink]="item.link">
            <div class="card mb-3">
              <div class="card-header">
                <h5 class="card-title text-center text-white mb-0">{{ item.title }}</h5>
              </div>
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
  public users: FireUser[] = new Array<FireUser>();
  private userRef: FireLoopRef<FireUser>;
  public roles: Role[] = new Array<Role>();
  private roleRef: FireLoopRef<Role>;
  public controls: ACL[] = new Array<ACL>();
  private controlRef: FireLoopRef<ACL>;
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private rt: RealTime,
  ) {
    this.subscriptions.push(
      this.rt.onReady().subscribe(
        (fire: any) => {
          this.userRef = this.rt.FireLoop.ref<FireUser>(FireUser);
          this.subscriptions.push(this.userRef.on('change').subscribe(
            (users: FireUser[]) => {
              this.users = users;
              this.setDashCards();
            }));
          this.roleRef = this.rt.FireLoop.ref<Role>(Role);
          this.subscriptions.push(this.roleRef.on('change').subscribe(
            (roles: Role[]) => {
              this.roles = roles;
              this.setDashCards();
            }));
          this.controlRef = this.rt.FireLoop.ref<ACL>(ACL);
          this.subscriptions.push(this.controlRef.on('change').subscribe(
            (controls: ACL[]) => {
              this.controls = controls;
              this.setDashCards();
            }));
        }));
  }

  ngOnDestroy() {
    this.userRef.dispose();
    this.roleRef.dispose();
    this.controlRef.dispose();
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
      },
      {
        icon: 'ban',
        title: 'Controls',
        data: this.controls.length,
        link: '/admin/controls'
      }
    ]
  }

}
