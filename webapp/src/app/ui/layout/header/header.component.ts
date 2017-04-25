import { Component, OnDestroy } from '@angular/core';
import { UiService } from '../../ui.service';
import { AccountApi } from '../../../shared/sdk/services';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AccountActions } from '../../../shared/sdk/actions/account';

@Component({
  selector: 'fire-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  public appName = 'Fireloop Starter';

  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    public uiService: UiService,
    public accountApi: AccountApi,
    private store: Store<any>
  ) {

  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  public logout() {
    this.store.dispatch(new AccountActions.logout({}));
  }

}
