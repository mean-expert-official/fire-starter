import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from '../shared/sdk/actions/user';
import { AccountApi } from '../shared/sdk/services';
import { UiService, NavItem } from '../ui/ui.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'fire-home',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./home.component.scss']

})
export class HomeComponent implements OnDestroy {
  private authIcon;
  private sidebarNav: NavItem[];
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private uiService: UiService,
    private userApi: AccountApi,
    private store: Store<any>,
  ) {
    this.uiService.setSidebarNav([
      {
        'name': 'Auth',
        'link': '/home/auth',
        'icon': this.getAuthIcon()
      },
      {
        'name': 'Dashboard',
        'link': '/home/dashboard',
        'icon': 'tachometer'
      },
      {
        'name': 'UI',
        'link': '/home/ui',
        'icon': 'object-group'
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

    ]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getAuthIcon() {
    if (this.userApi.isAuthenticated()) {
      return 'unlock'
    } else {
      return 'lock'
    }
  }
}
