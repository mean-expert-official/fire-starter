import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UIService } from '../ui/ui.service';
import { Store } from '@ngrx/store';

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
    private store: Store<any>,
  ) {
    this.store.select('auth').subscribe(
      (res: any) => {
        if (res.id) {
          this.authIcon = 'unlock';
          this.uiService.setSidebarNav(this.getSidebarNav());
        } else {
          this.authIcon = 'lock';
          this.uiService.setSidebarNav(this.getSidebarNav());
        }
      });

  }
  getSidebarNav() {
    return [
      {
        'name': 'Dashboard',
        'link': '/home/dashboard',
        'icon': 'tachometer'
      },
      {
        'name': 'Authentication',
        'link': '/home/auth',
        'icon': this.authIcon
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
      {
        'name': 'Files',
        'link': '/home/files',
        'icon': 'files-o'
      },
    ];
  }
}
