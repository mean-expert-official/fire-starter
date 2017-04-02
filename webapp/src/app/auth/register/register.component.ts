import { Component } from '@angular/core';
import { Store } from '@ngrx/store'

import { UserActions } from '../../shared/sdk/actions/user'

@Component({
  selector: 'app-auth-register',
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
      <div class="form-group">
        <input
          [(ngModel)]="credentials.firstName"
          type="text"
          class="form-control"
          id="firstName"
          name="firstName"
          placeholder="First name">
      </div>
      <div class="form-group">
        <input
          [(ngModel)]="credentials.lastName"
          type="text"
          class="form-control"
          id="lastName"
          name="lastName"
          placeholder="Last name">
      </div>
      <button type="submit"  (click)="submit()" class="btn btn-primary btn-block">Register</button>
    </form>
  `,
  styles: []
})
export class RegisterComponent {

  public credentials = {
    email: null,
    username: null,
    password: null,
    firstName: null,
    lastName: null,
  }

  constructor(private store: Store<any>) { }

  submit() {
    this.credentials.username = this.credentials.email
    this.store.dispatch(new UserActions.register({ credentials: this.credentials }))
  }

}
