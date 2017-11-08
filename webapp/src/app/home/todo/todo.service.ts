import { Injectable } from '@angular/core';
import { FireLoopRef, Todo } from '../../sdk/models';
import { RealTime } from '../../sdk/services/core/real.time';
import { Subscription } from 'rxjs/Subscription';
import { FireFormService } from '../../ui/components/form/fire-form.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoService {

  public subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private formService: FireFormService,
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
      'Text',
      'Due Date',
      'Done?',
      'Actions',
    ];
  }

  getFormConfig(formType: string) {
    return {
      fields: this.getFormFields(formType),
      showCancel: true,
      buttonColClass: 'col-12',
      action: formType === 'create' ? formType : 'update',
    };
  }

  getFormFields(formType: string) {
    const fields = [
      this.formService.input('text', {
        label: 'Text',
        addonLeft: {
          class: 'fa fa-fw fa-commenting'
        }
      }),
      this.formService.date('dueAt', {
        label: 'Due Date'
      }),
    ];
    if (formType === 'update') {
      fields.push(
        this.formService.checkbox('done', {
          label: 'Done?',
        }),
      );
    }
    return fields;
  }

}
