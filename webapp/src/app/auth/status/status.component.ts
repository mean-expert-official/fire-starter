import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from '../../shared/sdk/actions/user';
import { AccountApi } from '../../shared/sdk/services';

@Component({
  selector: 'fire-auth-status',
  template: `
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12">
          <div *ngIf="loggedIn" class="alert alert-success text-center" role="alert">
            <strong>Success!</strong> You are logged in as <strong>{{user?.email}}!</strong>
          </div>
          <div *ngIf="!loggedIn" class="alert alert-danger text-center" role="alert">
            <strong>Hello!</strong> You are not logged in!
          </div>
        </div>
        <div *ngIf="loggedIn" class="col-12 bg-info text-white mb-3">
          <pre class="text-white mb-0">{{ user | json }}</pre>
        </div>
        <div *ngIf="loggedIn" class="col">
          <button class="btn btn-danger btn-block" (click)="submit()">Logout</button>
        </div>
      </div>
    </div>
  `,
})
export class StatusComponent {

  public loggedIn: boolean = false;
  public user: any = {};

  constructor(private store: Store<any>, public userApi: AccountApi) {
    this.store.select('auth').subscribe(
      (res: any) => {
        if (res.id) {
          this.loggedIn = true;
          this.user = res.user;
        } else {
          this.loggedIn = false;
          this.user = {};
        }
      });
  }

  submit() {
    this.store.dispatch(new UserActions.logout({}));
  }
}
