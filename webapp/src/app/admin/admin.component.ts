import { Component } from '@angular/core';
import { UIService } from '../ui/ui.service';

@Component({
  selector: 'app-admin',
  template: `
    <nav class="navbar sticky-top admin-header" [class.sidebar-open]="uiService.sidebarOpen">
      <h5 class="text-center mb-0">
        <i class="fa fa-fw fa-lock" aria-hidden="true"></i>&nbsp; Admin
      </h5>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./admin.component.scss']

})
export class AdminComponent {
  private sidebarNav: any = [
    {
      'name': 'Dashboard',
      'link': '/admin/dashboard',
      'icon': 'tachometer'
    },
    {
      'name': 'Users',
      'link': '/admin/users',
      'icon': 'users'
    },
    {
      'name': 'Roles',
      'link': '/admin/roles',
      'icon': 'tags'
    },
  ];

  constructor(private uiService: UIService) {
    this.uiService.setSidebarNav(this.sidebarNav);
  }
}
