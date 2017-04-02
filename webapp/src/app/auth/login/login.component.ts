import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { UserActions } from '../../shared/sdk/actions/user'

@Component({
  selector: 'app-auth-login',
  template: `
    <form>
      <div class="form-group">
        <input
          [(ngModel)]="credentials.email"
          type="email"
          class="form-control"
          id="email"
          name="email"
          placeholder="Email">
      </div>
      <div class="form-group">
        <input
          [(ngModel)]="credentials.password"
          type="password"
          class="form-control"
          id="password"
          name="password"
          placeholder="Password">
      </div>
      <button type="submit"  (click)="submit()" class="btn btn-primary btn-block">Login</button>
    </form>
  `,
})
export class LoginComponent {

  public credentials = {
    email: null,
    password: null,
  }

  constructor(private store: Store<any>) { }

  submit() {
    this.store.dispatch(new UserActions.login({ credentials: this.credentials }))
  }
}
