import { Component } from '@angular/core';
import { UIService } from '../ui/ui.service';

@Component({
  selector: 'app-admin',
  template: `<router-outlet></router-outlet>`,
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
      'name': 'Auth',
      'link': '/admin/auth',
      'icon': 'lock'
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
    {
      'name': 'Controls',
      'link': '/admin/controls',
      'icon': 'ban'
    },
  ];

  constructor(public uiService: UIService) {
    this.uiService.setSidebarNav(this.sidebarNav);
  }
}
