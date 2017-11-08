import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store, State } from '@ngrx/store';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Account, Role } from '../../sdk';
import { UserFormComponent } from './form/user-form.component';
import { UserService } from './user.service';
import { UiService } from '../../ui/ui.service';
import { UserActions } from '../state/admin.state';
import * as Users from '../state/reducers/user.reducers';

@Component({
  selector: 'fire-user',
  template: `
  <fire-card icon="users"
             cardTitle="Users"
             [createButton]="userService.getCardButtons()"
             (action)="handleAction($event)">
    <fire-user-list *ngIf="users"
                    [users]="users | async"
                    [roles]="roles | async"
                    (action)="handleAction($event)">
    </fire-user-list>
  </fire-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnDestroy {

  private modalRef;
  public admin: Observable<any>;
  public users;
  public roles: Observable<Role[]>;
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private modal: NgbModal,
    public activeModal: NgbActiveModal,
    public uiService: UiService,
    public userService: UserService,
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
        this.modalRef = this.modal.open(UserFormComponent, { size: 'sm' });
        this.modalRef.componentInstance.item = item;
        this.modalRef.componentInstance.formConfig = this.userService.getFormConfig(type);
        this.modalRef.componentInstance.title = 'Create User';
        break;
      case 'update':
        this.modalRef = this.modal.open(UserFormComponent, { size: 'sm' });
        this.modalRef.componentInstance.item = item;
        this.modalRef.componentInstance.formConfig = this.userService.getFormConfig(type);
        this.modalRef.componentInstance.title = 'Update User';
        break;
      case 'viewRoles':
        const allRoles: Array<Role> = item.roles;
        const filteredRoleIds: Array<string> = item.user.roles.map(r => r.id);
        this.modalRef = this.modal.open(UserFormComponent, { size: 'lg' });
        this.modalRef.componentInstance.item = item.user;
        this.modalRef.componentInstance.items = allRoles.filter(r => filteredRoleIds.indexOf(r.id.toString()) >= 0);
        this.modalRef.componentInstance.title = `Roles for ${item.user.email}`;
        break;
      case 'addUserToRole':
        this.modalRef = this.modal.open(UserFormComponent, { size: 'sm' });
        this.modalRef.componentInstance.item = item;
        this.modalRef.componentInstance.formConfig = this.userService.getFormConfig(type, item);
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
        this.store.dispatch(new UserActions.createUser(event.payload));
        this.modalRef.close();
        break;
      case 'initUpdate':
        this.showDialog('update', event.payload);
        break;
      case 'update':
        this.store.dispatch(new UserActions.updateUser(event.payload));
        this.modalRef.close();
        break;
      case 'initDelete':
        const question = {
          title: 'Delete User',
          html: `
          <p class="lead">Are you sure you want to delete User
            <span class="font-weight-bold font-italic">${event.payload.email}</span>?
          </p>
        `,
          confirmButtonText: 'Yes, Delete'
        };
        this.uiService.alertError(question, () => this.handleAction({ type: 'delete', payload: event.payload }), () => { });
        break;
      case 'delete':
        this.store.dispatch(new UserActions.deleteUser(event.payload));
        break;
      case 'viewRoles':
        this.showDialog('viewRoles', event.payload);
        break;
      case 'initAddUserToRole':
        this.showDialog('addUserToRole',
          {
            userId: event.payload.user.id,
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
