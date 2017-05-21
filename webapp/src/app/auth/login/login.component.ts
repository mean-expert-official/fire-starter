import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AccountActions } from '../../sdk/actions';
import { FireFormService } from '../../ui/components/form/fire-form.service';
import { AccountApi } from '../../sdk/services';

@Component({
  selector: 'fire-auth-login',
  template: `
    <fire-form *ngIf="!userApi.isAuthenticated()" [config]="formConfig" [item]="credentials" (action)="login()"></fire-form>
    <button *ngIf="userApi.isAuthenticated()" class="btn btn-danger btn-block" (click)="logout()">Logout</button>
  `,
})
export class LoginComponent {

  public credentials = {
    email: null,
    password: null,
  }

  public formConfig: {};

  constructor(
    private store: Store<any>,
    private formService: FireFormService,
    public userApi: AccountApi
  ) {
    this.formConfig = this.getFormConfig();
  }

  getFormConfig() {
    return {
      fields: this.getFormFields(),
      showCancel: false,
      action: 'login',
      submitButtonText: 'Log In'
    };
  }

  getFormFields() {
    return [
      this.formService.email('email', {
        label: 'Email',
        className: 'col-12',
        addonLeft: {
          class: 'fa fa-fw fa-envelope-o'
        }
      }),
      this.formService.password('password', {
        label: 'Password',
        className: 'col-12',
        addonLeft: {
          class: 'fa fa-fw fa-key'
        }
      })
    ];
  }

  login() {
    this.store.dispatch(new AccountActions.login(this.credentials));
  }

  logout() {
    this.store.dispatch(new AccountActions.logout());
  }
}
