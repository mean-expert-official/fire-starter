import { Injectable } from '@angular/core';
import { ACLApi, SDKModels, RoleApi } from '../../shared/sdk/services/custom';
import { Subscription } from 'rxjs/Subscription';
import { FormService } from '../../ui/form/ui-form.service';
import { Observable } from 'rxjs/Observable';
import { sortBy } from 'lodash';

@Injectable()
export class ControlService {

  private subscriptions: Subscription[] = new Array<Subscription>();
  models: any;
  roles: any;

  constructor(
    private formService: FormService,
    private aclApi: ACLApi,
    private sdkModels: SDKModels,
    private roleApi: RoleApi
  ) {
    this.getModels();
    this.getRoles();
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
      'Model',
      'Property',
      'Access Type',
      'Permission',
      'Principal Type',
      'Principal ID',
      'Actions'
    ];
  }

  getFormConfig(formType: string) {
    return {
      fields: this.getFormFields(formType),
      showCancel: true,
      action: formType === 'create' ? formType : 'update',
    };
  }

  getModels() {
    const models = this.sdkModels.getAll();
    this.models = sortBy(Object.keys(models));
  }

  getRoles() {
    this.subscriptions.push(this.roleApi.find().subscribe((roles: any) => (this.roles = roles)));
  }

  getFormFields(formType: string) {
    let models = [];
    let roles = [];
    const defaultRoles = ['$authenticated', '$everyone', '$owner', '$unauthenticated'];
    models.push({ label: '*', value: '*' });
    defaultRoles.forEach((role: any) => (roles.push({ label: role, value: role })));
    this.models.forEach((model: any) => (models.push({ label: model, value: model })));
    this.roles.forEach((role: any) => (roles.push({ label: role.name, value: role.name })));
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
