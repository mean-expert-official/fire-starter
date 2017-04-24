import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from '../../store/actions/user';
import { FormService } from '../../ui/form/ui-form.service';
import { AccountApi } from '../../shared/sdk/services';

@Component({
  selector: 'fire-auth-login',
  template: `
    <ui-form *ngIf="!userApi.isAuthenticated()" [config]="formConfig" [item]="credentials" (action)="login()"></ui-form>
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
    private formService: FormService,
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
    this.store.dispatch(new UserActions.login({ credentials: this.credentials }))
  }

  logout() {
    this.store.dispatch(new UserActions.logout({}));
  }
}
