import { Component } from '@angular/core';
import { FireUserApi } from '../shared/sdk/services';
import { UIService } from '../ui/ui.service';

@Component({
  selector: 'app-admin',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./admin.component.scss']

})
export class AdminComponent {
  private authIcon;
  private sidebarNav: any;

  constructor(
    private uiService: UIService,
    private userApi: FireUserApi
  ) {
    this.setSidebarNav();
    this.uiService.setSidebarNav(this.sidebarNav);
  }

  setSidebarNav() {
    this.sidebarNav = [
      {
        'name': 'Dashboard',
        'link': '/admin/dashboard',
        'icon': 'tachometer'
      },
      {
        'name': 'Auth',
        'link': '/admin/auth',
        'icon': this.getAuthIcon()
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
  }

  getAuthIcon() {
    if (this.userApi.isAuthenticated()) {
      return 'unlock'
    } else {
      return 'lock'
    }
  }
}
