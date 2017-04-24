import { Component, OnDestroy } from '@angular/core';
import { UiService } from '../../ui.service';
import { AccountApi } from '../../../shared/sdk/services';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../store/actions';

@Component({
  selector: 'fire-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    public uiService: UiService,
    public userApi: AccountApi,
    private store: Store<any>
  ) {

  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  public appName = 'Fireloop Starter';

  public logout() {
    this.store.dispatch(new UserActions.logout({}));
  }

}
