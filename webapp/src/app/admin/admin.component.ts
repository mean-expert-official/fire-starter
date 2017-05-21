import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiService, NavItem } from '../ui/ui.service';
import { Subscription } from 'rxjs/Subscription';
import { UserActions, RoleActions, ControlActions } from './state/admin.state';

@Component({
  selector: 'fire-admin',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./admin.component.scss']

})
export class AdminComponent {
  private authIcon;
  private sidebarNav: NavItem[];
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private uiService: UiService,
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

    this.store.dispatch(new UserActions.readUsers({ include: 'roles' }));
    this.store.dispatch(new RoleActions.readRoles({ include: 'principals' }));
    this.store.dispatch(new ControlActions.readControls());
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
