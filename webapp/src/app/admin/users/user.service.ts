import { Injectable } from '@angular/core';
import { FireLoopRef, Account } from '../../shared/sdk/models';
import { FormService } from '../../ui/form/ui-form.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(
    private formService: FormService,
  ) {

  }

  getCardButtons() {
    return {
      class: 'btn btn-secondary btn-block float-right',
      icon: 'plus',
      text: 'Create'
    };
  }

  getTableHeaders() {
    return [
      'Email',
      'First Name',
      'Last Name',
      'Actions',
    ];
  }

  getFormConfig(formType: string) {
    return {
      fields: this.getFormFields(formType),
      showCancel: true,
      action: formType === 'create' ? formType : 'update',
    };
  }

  getFormFields(formType: string) {
    let fields = [
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
      }),
    ];
    if (formType === 'update') {
      fields.splice(1, 1);
    }
    return fields;
  }

}
