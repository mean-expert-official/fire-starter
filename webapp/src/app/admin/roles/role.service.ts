// import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Role, Account } from '../../sdk';
import { FireFormService } from '../../ui/components/form/fire-form.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoleService {

  constructor(
    public formService: FireFormService,
  ) {

  }

  getCardButtons() {
    return {
      class: 'btn btn-secondary btn-block float-right',
      icon: 'plus',
      text: 'Create',
      action: 'initCreate'
    };
  }

  getTableHeaders(type: string) {
    switch (type) {
      case 'roles':
        return [
          'Actions',
          'Role Name',
          'Role Description',
          'Principals',
        ];
      case 'usersInRole':
        return [
          'Actions',
          'Email',
          'First Name',
          'Last Name',
        ];
      default:
        console.log('Unknown Type', type);
        break;
    }

  }

  getFormConfig(formType: string, options?: any) {
    switch (formType) {
      case 'create':
        return {
          fields: this.getFormFields(formType),
          showCancel: true,
          action: 'create',
        }
      case 'update':
        return {
          fields: this.getFormFields(formType),
          showCancel: true,
          action: 'update',
        }
      case 'addUserToRole':
        return {
          fields: this.getFormFields(formType, options),
          showCancel: true,
          action: 'addUserToRole',
        }
      default:
        return console.log('Unknown formType', formType);
    }
  }

  getFormFields(formType: string, options?: any) {
    switch (formType) {
      case 'create':
        return [
          this.formService.input('name', {
            label: 'Role Name',
            className: 'col-12',
            addonLeft: {
              class: 'fa fa-fw fa-tag'
            }
          }),
          this.formService.input('description', {
            label: 'Role Description',
            className: 'col-12',
            addonLeft: {
              class: 'fa fa-fw fa-comment-o'
            }
          }),
        ];
      case 'update':
        return [
          this.formService.input('name', {
            label: 'Role Name',
            className: 'col-12',
            addonLeft: {
              class: 'fa fa-fw fa-tag'
            }
          }),
          this.formService.input('description', {
            label: 'Role Description',
            className: 'col-12',
            addonLeft: {
              class: 'fa fa-fw fa-comment-o'
            }
          }),
        ];
      case 'addUserToRole':
        const users = options.users.map((user: Account) => Object.assign({}, { label: user.email, value: user.id }));
        const roles = options.roles.map((role: Role) => Object.assign({}, { label: role.name, value: role.id }));
        return [
          this.formService.select('userId', {
            label: 'User',
            className: 'col-12',
            addonLeft: {
              class: 'fa fa-fw fa-user'
            },
            options: users,
          }),
          this.formService.select('roleId', {
            label: 'Role',
            className: 'col-12',
            addonLeft: {
              class: 'fa fa-fw fa-tag'
            },
            options: roles,
          }),
        ];
    }
  }
}
