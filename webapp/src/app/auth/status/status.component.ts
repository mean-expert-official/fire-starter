import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from '../../store/actions';
import { AccountApi } from '../../shared/sdk/services';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'fire-auth-status',
  template: `
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12">
          <div *ngIf="userApi.isAuthenticated()" class="alert alert-success text-center" role="alert">
            <strong>Success!</strong> You are logged in as <strong>{{ auth.user.email }}!</strong>
          </div>
          <div *ngIf="!userApi.isAuthenticated()" class="alert alert-danger text-center" role="alert">
            <strong>Hello!</strong> You are not logged in!
          </div>
        </div>
        <div *ngIf="userApi.isAuthenticated()" class="col-12 bg-info text-white mb-3">
          <pre class="text-white mb-0">{{ auth | json }}</pre>
        </div>
      </div>
    </div>
  `,
})
export class StatusComponent implements OnDestroy {

  public auth: any = {};
  private subscriptions: Subscription[] = new Array<Subscription>();

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  constructor(private store: Store<any>, public userApi: AccountApi) {
    this.subscriptions.push(this.store.select('auth').subscribe(a => this.auth = a));
  }
}
