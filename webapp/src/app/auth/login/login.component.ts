import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from '../../shared/sdk/actions/user';
import { FormService } from '../../ui/form/ui-form.service';

@Component({
  selector: 'fire-auth-login',
  template: `
    <ui-form [config]="formConfig" [item]="credentials" (action)="submit()"></ui-form>
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
    private formService: FormService
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

  submit() {
    this.store.dispatch(new UserActions.login({ credentials: this.credentials }))
  }
}
