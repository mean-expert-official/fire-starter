import { Injectable } from '@angular/core';
import { Role } from '../../sdk/models';
import { SDKModels, RoleApi, Models } from '../../sdk/services';
import { Subscription } from 'rxjs/Subscription';
import { FireFormService } from '../../ui/components/form/fire-form.service';
import { Observable } from 'rxjs/Observable';
import { sortBy } from 'lodash';

@Injectable()
export class ControlService {

  private subscriptions: Subscription[] = new Array<Subscription>();
  models: Models;
  roles: Role[];

  constructor(
    private formService: FireFormService,
    private sdkModels: SDKModels,
    private roleApi: RoleApi
  ) {
    this.getModels();
  }

  getCardButtons() {
    return {
      class: 'btn btn-secondary btn-block float-right',
      icon: 'plus',
      text: 'Create',
      action: 'initCreate'
    };
  }

  getTableHeaders(): string[] {
    return [
      'Actions',
      'Model',
      'Property',
      'Access Type',
      'Permission',
      'Principal Type',
      'Principal ID',
    ];
  }

  getFormConfig(formType: string, options?: any): any {
    return {
      fields: this.getFormFields(formType, options),
      showCancel: true,
      action: formType === 'create' ? formType : 'update',
    };
  }

  getModels(): void {
    const models = this.sdkModels.getAll();
    this.models = sortBy(Object.keys(models));
  }

  getFormFields(formType: string, options?: any): any[] {
    const defaultRoles = ['$authenticated', '$everyone', '$owner', '$unauthenticated'];
    const models = this.models.map((model) => Object.assign({}, { label: model, value: model }));
    const roles = options.roles.map((role: Role) => Object.assign({}, { label: role.name, value: role.name }));
    models.push({ label: '*', value: '*' });
    defaultRoles.forEach((role: any) => roles.push({ label: role, value: role }));
    let fields = [
      this.formService.select('model', {
        label: 'Model',
        className: 'col-12 col-lg-6',
        addonLeft: {
          class: 'fa fa-fw fa-tag'
        },
        options: models
      }),
      this.formService.select('property', {
        label: 'Property',
        className: 'col-12 col-lg-6',
        addonLeft: {
          class: 'fa fa-fw fa-comment'
        },
        options: [
          {
            label: 'find',
            value: 'find'
          },
          {
            label: 'findById',
            value: 'findById'
          },
          {
            label: '*',
            value: '*'
          }
        ]
      }),
      this.formService.select('accessType', {
        label: 'Access Type',
        className: 'col-12 col-lg-6',
        addonLeft: {
          class: 'fa fa-fw fa-comment'
        },
        options: [
          {
            label: 'READ',
            value: 'READ'
          },
          {
            label: 'WRITE',
            value: 'WRITE'
          },
          {
            label: 'EXECUTE',
            value: 'EXECUTE'
          },
          {
            label: '*',
            value: '*'
          }
        ]
      }),
      this.formService.select('permission', {
        label: 'Permission',
        className: 'col-12 col-lg-6',
        addonLeft: {
          class: 'fa fa-fw fa-comment'
        },
        options: [
          {
            label: 'ALLOW',
            value: 'ALLOW'
          },
          {
            label: 'DENY',
            value: 'DENY'
          }
        ]
      }),
      this.formService.select('principalType', {
        label: 'Principal Type',
        className: 'col-12 col-lg-6',
        addonLeft: {
          class: 'fa fa-fw fa-comment'
        },
        options: [
          {
            label: 'ROLE',
            value: 'ROLE'
          }
        ]
      }),
      this.formService.select('principalId', {
        label: 'Principal ID',
        className: 'col-12 col-lg-6',
        addonLeft: {
          class: 'fa fa-fw fa-comment'
        },
        options: roles
      }),
    ];
    return fields;
  }

}
