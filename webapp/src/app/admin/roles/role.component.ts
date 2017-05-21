import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store, State } from '@ngrx/store';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Role, Account } from '../../sdk';
import { RoleFormComponent } from './form/role-form.component';
import { RoleService } from './role.service';
import { UiService } from '../../ui/ui.service';
import { RoleActions, UserActions } from '../state/admin.state';
import * as Roles from '../state/reducers/role.reducers';
import { sortBy, omit } from 'lodash';

@Component({
  selector: 'fire-role',
  template: `
  <fire-card icon="tags"
             cardTitle="Roles"
             [createButton]="roleService.getCardButtons()"
             (action)="handleAction($event)">
    <fire-role-list *ngIf="roles"
                    [roles]="roles | async"
                    [users]="users | async"
                    (action)="handleAction($event)">
    </fire-role-list>
  </fire-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleComponent implements OnDestroy {

  private modalRef;
  public admin;
  public roles;
  public users;
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private modal: NgbModal,
    public uiService: UiService,
    public roleService: RoleService,
    private store: Store<any>,
  ) {
    this.admin = store.select('admin');
    this.users = this.admin.map((a) => {
      return a.users.ids.map((id) => a.users.entities[id]);
    });
    this.roles = this.admin.map((a) => {
      return a.roles.ids.map((id) => a.roles.entities[id]);
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  showDialog(type: any, item: any) {
    switch (type) {
      case 'create':
        this.modalRef = this.modal.open(RoleFormComponent, { size: 'sm' });
        this.modalRef.componentInstance.item = item;
        this.modalRef.componentInstance.formConfig = this.roleService.getFormConfig(type);
        this.modalRef.componentInstance.title = 'Create Role';
        break;
      case 'update':
        this.modalRef = this.modal.open(RoleFormComponent, { size: 'sm' });
        this.modalRef.componentInstance.item = item;
        this.modalRef.componentInstance.formConfig = this.roleService.getFormConfig(type);
        this.modalRef.componentInstance.title = 'Update Role';
        break;
      case 'viewPrincipals':
        const allUsers: Array<Account> = item.users;
        const filteredUserIds: Array<string> = item.role.principals.map(p => p.principalId);
        this.modalRef = this.modal.open(RoleFormComponent, { size: 'lg' });
        this.modalRef.componentInstance.item = item.role;
        this.modalRef.componentInstance.items = allUsers.filter(u => filteredUserIds.indexOf(u.id) >= 0);
        this.modalRef.componentInstance.title = `Principals for ${item.role.name}`;
        break;
      case 'addUserToRole':
        this.modalRef = this.modal.open(RoleFormComponent, { size: 'sm' });
        this.modalRef.componentInstance.item = item;
        this.modalRef.componentInstance.formConfig = this.roleService.getFormConfig(type, item);
        this.modalRef.componentInstance.title = 'Add User to Role';
        break;
      default:
        console.log('Unknown Type', type);
        break;
    }
    this.subscriptions.push(this.modalRef.componentInstance.action.subscribe(event => this.handleAction(event)));
  }

  handleAction(event) {
    switch (event.type) {
      case 'cancel':
        this.modalRef.close();
        break;
      case 'initCreate':
        this.showDialog('create', new Account());
        break;
      case 'create':
        event.payload.roles = [];
        this.store.dispatch(new RoleActions.createRole(event.payload));
        this.modalRef.close();
        break;
      case 'initUpdate':
        this.showDialog('update', event.payload);
        break;
      case 'update':
        this.store.dispatch(new RoleActions.updateRole(event.payload));
        this.modalRef.close();
        break;
      case 'initDelete':
        const question = {
          title: 'Delete Role',
          html: `
          <p class="lead">Are you sure you want to delete Role
            <span class="font-weight-bold font-italic">${event.payload.email}</span>?
          </p>
        `,
          confirmButtonText: 'Yes, Delete'
        };
        this.uiService.alertError(question, () => this.handleAction({ type: 'delete', payload: event.payload }), () => { });
        break;
      case 'delete':
        this.store.dispatch(new RoleActions.deleteRole(event.payload));
        break;
      case 'viewPrincipals':
        this.showDialog('viewPrincipals', event.payload);
        break;
      case 'initAddUserToRole':
        this.showDialog('addUserToRole',
          {
            roleId: event.payload.role.id,
            users: event.payload.users,
            roles: event.payload.roles
          });
        break;
      case 'addUserToRole':
        event.payload.user = event.payload.users.filter(user => user.id === event.payload.userId)[0];
        event.payload.role = event.payload.roles.filter(role => role.id === event.payload.roleId)[0];
        event.payload.principal = Object.assign({}, {
          principalType: 'USER',
          principalId: event.payload.userId,
          roleId: event.payload.roleId
        });
        this.store.dispatch(new UserActions.addUserToRole(event.payload));
        this.modalRef.close();
        break;
      case 'initDeleteUserFromRole':
        const question2 = {
          title: 'Delete Role',
          html: `
            <p class="lead">Are you sure you want to remove user
              <span class="font-weight-bold font-italic">${event.payload.user.email}</span> from the
              <span class="font-weight-bold font-italic">${event.payload.role.name}</span> role?
            </p>
          `,
          confirmButtonText: 'Yes, Delete'
        };
        this.uiService.alertError(question2, () => this.handleAction({ type: 'deleteUserFromRole', payload: event.payload }), () => { });
        break;
      case 'deleteUserFromRole':
        this.store.dispatch(new UserActions.deleteUserFromRole(event.payload));
        this.modalRef.close();
        break;
      default:
        console.log('Unknown Event Action', event);
        break;
    }
  }

}
