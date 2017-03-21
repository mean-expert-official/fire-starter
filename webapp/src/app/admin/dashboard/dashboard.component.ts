import { Component } from '@angular/core';
import { UserService } from '../users/user.service';
import { RoleService } from '../roles/role.service';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <app-card icon="tachometer" title="Dashboard">
      <div class="row">
        <div *ngFor="let item of dashCards" class="col-12 col-lg-6">
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
  styleUrls: ['../admin.component.scss']
})

export class DashboardComponent {

  private dashCards: any = [];

  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {
    this.dashCards = [
      {
        icon: 'users',
        title: 'Users',
        data: this.userService.users.length,
        link: '/admin/users'
      },
      {
        icon: 'tags',
        title: 'Roles',
        data: this.roleService.roles.length,
        link: '/admin/roles'
      }
    ]
  }

}
