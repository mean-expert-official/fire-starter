import { Injectable } from '@angular/core';
import { FireLoopRef, User } from '../../shared/sdk/models';
import { RealTime } from '../../shared/sdk/services/core/real.time';
import { Subscription } from 'rxjs/Subscription';
import { FormService } from '../../ui/form/ui-form.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  public users: User[] = new Array<User>();
  public userRef: FireLoopRef<User>;
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private formService: FormService,
  ) {

  }

  getCardButtons() {
    return {
      class: 'btn btn-primary btn-block float-right',
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

  upsert(user: User): Observable<User> {
    if (user.id) {
      return this.userRef.upsert(user);
    } else {
      return this.userRef.create(user);
    }
  }

  delete(user: User): Observable<User> {
    return this.userRef.remove(user);
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
        className: 'col-12 col-lg-6',
        addonLeft: {
          class: 'fa fa-fw fa-envelope-o'
        }
      }),
      this.formService.password('password', {
        label: 'Password',
        className: 'col-12 col-lg-6',
        addonLeft: {
          class: 'fa fa-fw fa-key'
        }
      }),
      this.formService.input('firstName', {
        label: 'First Name',
        className: 'col-12 col-lg-6',

        addonLeft: {
          class: 'fa fa-fw fa-user-o'
        }
      }),
      this.formService.input('lastName', {
        label: 'Last Name',
        className: 'col-12 col-lg-6',
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
