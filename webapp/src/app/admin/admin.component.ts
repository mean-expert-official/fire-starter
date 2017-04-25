import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AccountActions } from '../shared/sdk/actions/account';
import { AccountApi } from '../shared/sdk/services';
import { UiService, NavItem } from '../ui/ui.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'fire-admin',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./admin.component.scss']

})
export class AdminComponent implements OnDestroy {
  private authIcon;
  private sidebarNav: NavItem[];
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private uiService: UiService,
    private accountApi: AccountApi,
    private store: Store<any>,
  ) {
    this.uiService.setSidebarNav([
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
      {
        'name': 'Controls',
        'link': '/admin/controls',
        'icon': 'ban'
      },
    ]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getAuthIcon() {
    if (this.accountApi.isAuthenticated()) {
      return 'unlock';
    } else {
      return 'lock';
    }
  }
}
