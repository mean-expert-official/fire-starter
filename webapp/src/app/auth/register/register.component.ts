import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from '../../store/actions';
import { FormService } from '../../ui/form/ui-form.service';
import { Subscription } from 'rxjs/Subscription';
import { UiService } from '../../ui/ui.service';

@Component({
  selector: 'fire-auth-register',
  template: `
    <ui-form #uiForm [config]="formConfig" [item]="registration" (action)="submit()"></ui-form>
  `,
  styles: []
})
export class RegisterComponent {

  private subscriptions: Subscription[] = new Array<Subscription>();

  public registration = {
    email: null,
    username: null,
    password: null,
    firstName: null,
    lastName: null,
  }

  public formConfig: {};

  constructor(
    private store: Store<any>,
    private formService: FormService,
    private uiService: UiService
  ) {
    this.formConfig = this.getFormConfig();
  }

  getFormConfig() {
    return {
      fields: this.getFormFields(),
      showCancel: false,
      action: 'register',
      submitButtonText: 'Submit'
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
      }),
      this.formService.input('firstName', {
        label: 'First Name',
        className: 'col-12',
        addonLeft: {
          class: 'fa fa-fw fa-user-o'
        }
      }),
      this.formService.input('lastName', {
        label: 'Last Name',
        className: 'col-12',
        addonLeft: {
          class: 'fa fa-fw fa-user-o'
        }
      })
    ];
  }

  submit() {
    this.registration.username = this.registration.email;
    this.store.dispatch(new UserActions.register({ credentials: this.registration }));
  }

}
