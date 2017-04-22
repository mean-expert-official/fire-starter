import { Component, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireLoopRef, Role, Account } from '../../shared/sdk/models';
import { RealTime, RoleApi, AccountApi } from '../../shared/sdk/services';
import { RoleFormComponent } from './form/role-form.component';
import { ViewUsersComponent } from './form/view-users.component';
import { RoleService } from './role.service';
import { UiService } from '../../ui/ui.service';
import { Subscription } from 'rxjs/Subscription';
import { sortBy, omit } from 'lodash';

@Component({
  selector: 'fire-role',
  templateUrl: './role.component.html',
})
export class RoleComponent implements OnDestroy {

  private modalRef;
  public roles: Role[] = new Array<Role>();
  private roleRef: FireLoopRef<Role>;
  public users: Account[] = new Array<Account>();
  private userRef: FireLoopRef<Account>;
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private modal: NgbModal,
    public uiService: UiService,
    public roleService: RoleService,
    private rt: RealTime,
    private roleApi: RoleApi,
    private userApi: AccountApi
  ) {
    this.subscriptions.push(this.rt.onReady().subscribe((fire: any) => {
      this.roleRef = this.rt.FireLoop.ref<Role>(Role);
      this.refresh();
      this.userRef = this.rt.FireLoop.ref<Account>(Account);
      this.subscriptions.push(this.userRef.on('change').subscribe(
        (users: Account[]) => {
          this.users = users;
        }));
    }));
  }

  ngOnDestroy() {
    this.roleRef.dispose();
    this.userRef.dispose();
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  refresh(): void {
    this.subscriptions.push(this.roleRef.on('change', {
      order: 'name ASC',
      include: 'principals'
    }).subscribe(
      (roles: Role[]) => {
        roles.forEach((role: any) => (role.principalCount = role.principals.length));
        this.roles = roles;
      }));
  }

  showDialog(type, item, options?): void {
    this.modalRef = this.modal.open(RoleFormComponent, { size: 'sm' });
    this.modalRef.componentInstance.item = item;
    this.modalRef.componentInstance.formConfig = this.roleService.getFormConfig(type, options ? options : '');
    switch (type) {
      case 'create':
        this.modalRef.componentInstance.title = 'Create Role'
        break;
      case 'update':
        this.modalRef.componentInstance.title = 'Update Role'
        break;
      case 'addUser':
        this.modalRef.componentInstance.title = 'Add User to Role'
        break;
      default:
        console.log('Unknown type', type);
        break;
    };
    this.subscriptions.push(this.modalRef.componentInstance.action.subscribe(event => this.handleAction(event)));
  }

  create() {
    this.showDialog('create', new Role());
  }

  update(role: Role) {
    const nextRole = omit(role, ['principalCount', 'principals']);
    this.showDialog('update', nextRole);
  }

  delete(role: Role) {
    const question = {
      title: 'Delete Role',
      html: `
        <p class="lead">Are you sure you want to delete the
          <span class="font-weight-bold font-italic">${role.name}</span> role?
        </p>
      `,
      confirmButtonText: 'Yes, Delete'
    };
    this.uiService.alertError(question, () => this.handleAction({ type: 'delete', payload: role }), () => { });
  }

  viewUsers(role: Role) {
    this.modalRef = this.modal.open(ViewUsersComponent, { size: 'lg' });
    this.modalRef.componentInstance.title = `${role.name} Users`;
    this.modalRef.componentInstance.role = role;
    if (role.principals[0]) {
      let principalList = [];
      let principals = [];
      role.principals.forEach((principal: any) => {
        principalList.push({ id: principal.principalId, mapping: principal.id });
      });
      principalList.forEach((principal: any) => {
        this.subscriptions.push(this.userApi.findById(principal.id).subscribe(
          (user: any) => {
            principals.push({ user: user, mapping: principal.mapping })
          }));
      });
      this.modalRef.componentInstance.users = principals;
    };
    this.subscriptions.push(this.modalRef.componentInstance.action.subscribe(event => this.handleAction(event)));
  }

  addUser(role: Role) {
    let options = {
      users: this.users,
      roles: this.roles
    };
    this.showDialog('addUser', role, options);
  }

  handleAction(event) {
    switch (event.type) {
      case 'create':
        this.subscriptions.push(this.roleRef.create(event.payload).subscribe(
          () => {
            this.modalRef.close();
            this.uiService.toastSuccess('Role Created', 'The Role was created successfully.');
          },
          (err) => {
            this.modalRef.close();
            this.uiService.toastError('Create Role Failed', err.message || err.error.message);
          },
        ));
        break;
      case 'update':
        this.subscriptions.push(this.roleRef.upsert(event.payload).subscribe(
          () => {
            this.modalRef.close();
            this.uiService.toastSuccess('Role Updated', 'The Role was updated successfully.');
          },
          (err) => {
            this.modalRef.close();
            this.uiService.toastError('Update Role Failed', err.message || err.error.message);
          },
        ));
        break;
      case 'delete':
        this.subscriptions.push(this.roleRef.remove(event.payload).subscribe(
          () => {
            this.uiService.toastSuccess('Role Deleted', 'The Role was deleted successfully.');
          },
          (err) => {
            this.uiService.toastError('Delete Role Failed', err.message || err.error.message);
          },
        ));
        break;
      case 'deleteUserInit':
        const question = {
          title: 'Delete User',
          html: `
            <p class="lead">Are you sure you want to delete user
              <span class="font-weight-bold font-italic">${event.payload.user.email}</span>
              from the <span class="font-weight-bold font-italic">${event.payload.role.name}</span> role?
            </p>
          `,
          confirmButtonText: 'Yes, Delete'
        };
        this.uiService.alertError(question, () => this.handleAction({ type: 'deleteUser', payload: event.payload }), () => { });
        break;
      case 'deleteUser':
        this.subscriptions.push(this.roleApi.destroyByIdPrincipals(event.payload.role.id, event.payload.mapping).subscribe(
          () => {
            this.modalRef.close();
            this.uiService.toastSuccess('User Deleted', 'The user was deleted successfully.');
            this.refresh();
          },
          (err) => {
            this.uiService.toastError('Delete User Failed', err.message || err.error.message);
          },
        ));
        break;
      case 'addUser':
        let mapping = {
          principalType: 'USER',
          principalId: event.payload.user,
          roleId: event.payload.id
        }
        this.subscriptions.push(this.roleApi.createPrincipals(event.payload.id, mapping).subscribe(
          () => {
            this.refresh();
            this.modalRef.close();
            this.uiService.toastSuccess('User Added', 'The user was added successfully.');
          },
          (err) => {
            this.uiService.toastError('Add User Failed', err.message || err.error.message);
          },
        ));
        break;
      default:
        return console.log('Unknown event action', event);
    }
  }

}
