import { Injectable } from '@angular/core';
import { FireLoopRef, Role } from '../../shared/sdk/models';
import { Subscription } from 'rxjs/Subscription';
import { FormService } from '../../ui/form/ui-form.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoleService {

  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private formService: FormService,
  ) { }

  getCardButtons() {
    return {
      class: 'btn btn-primary btn-block float-right',
      icon: 'plus',
      text: 'Create'
    };
  }

  getTableHeaders() {
    return [
      'Name',
      'Description',
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
      this.formService.input('name', {
        label: 'Name',
        className: 'col-12 col-lg-6',
        addonLeft: {
          class: 'fa fa-fw fa-tag'
        }
      }),
      this.formService.input('description', {
        label: 'Description',
        className: 'col-12 col-lg-6',
        addonLeft: {
          class: 'fa fa-fw fa-comment'
        }
      }),
    ];
    return fields;
  }

}
