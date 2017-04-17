import { Component, OnDestroy } from '@angular/core';
import { UIService } from '../../ui.service';
import { FireUserApi } from '../../../shared/sdk/services';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    public uiService: UIService,
    public userApi: FireUserApi
  ) {

  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  public appName = 'Fireloop Starter';

  public logout() {
    this.userApi.logout().subscribe(() => {
      let sidebarNav = this.uiService.getSidebarNav();
      sidebarNav[1].icon = 'lock';
      this.uiService.setSidebarNav(sidebarNav);
      console.log('Log Out processed');
    });
  }

}
