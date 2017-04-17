import { Component } from '@angular/core';
import { FireUserApi } from '../shared/sdk/services';
import { UIService } from '../ui/ui.service';

@Component({
  selector: 'app-home',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./home.component.scss']

})
export class HomeComponent {
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
        'link': '/home/dashboard',
        'icon': 'tachometer'
      },
      {
        'name': 'Auth',
        'link': '/home/auth',
        'icon': this.getAuthIcon()
      },
      {
        'name': 'Files',
        'link': '/home/files',
        'icon': 'files-o'
      },
      {
        'name': 'Todos',
        'link': '/home/todos',
        'icon': 'check-square-o'
      },
      {
        'name': 'Notes',
        'link': '/home/notes',
        'icon': 'sticky-note-o'
      },
      {
        'name': 'Notifications',
        'link': '/home/notifications',
        'icon': 'comments-o'
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
