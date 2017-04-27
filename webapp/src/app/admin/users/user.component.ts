import { Component, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountApi } from '../../shared/sdk/services';
import { Account } from '../../shared/sdk/models';
import { UserFormComponent } from './form/user-form.component';
import { UserService } from './user.service';
import { UiService } from '../../ui/ui.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'fire-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnDestroy {

  private modalRef;
  public users: Account[] = new Array<Account>();
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private modal: NgbModal,
    public uiService: UiService,
    public userService: UserService,
    public userApi: AccountApi,
  ) {
    this.refresh();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  refresh() {
    this.subscriptions.push(this.userApi.find({
      include: 'roles',
      order: 'email ASC'
    }).subscribe(
      (users: Account[]) => {
        this.users = users;
      }));
  }

  showDialog(type, item) {
    this.modalRef = this.modal.open(UserFormComponent, { size: 'sm' });
    this.modalRef.componentInstance.item = item;
    this.modalRef.componentInstance.formConfig = this.userService.getFormConfig(type);
    this.modalRef.componentInstance.title = (type === 'create') ? 'Create User' : 'Update User';
    this.subscriptions.push(this.modalRef.componentInstance.action.subscribe(event => this.handleAction(event)));
  }

  create() {
    this.showDialog('create', new Account());
  }

  update(user: Account) {
    this.showDialog('update', user);
  }

  delete(user: Account) {
    const question = {
      title: 'Delete User',
      html: `
        <p class="lead">Are you sure you want to delete User
          <span class="font-weight-bold font-italic">${user.email}</span>?
        </p>
      `,
      confirmButtonText: 'Yes, Delete'
    };
    this.uiService.alertError(question, () => this.handleAction({ type: 'delete', payload: user }), () => { });
  }

  handleAction(event) {
    switch (event.type) {
      case 'create':
        this.subscriptions.push(this.userApi.create(event.payload).subscribe(
          () => {
            this.refresh();
            this.modalRef.close();
            this.uiService.toastSuccess('User Created', 'The User was created successfully.');
          }, (err) => {
            this.modalRef.close();
            this.uiService.toastError('Create User Failed', err.message || err.error.message);
          },
        ));
        break;
      case 'update':
        this.subscriptions.push(this.userApi.upsert(event.payload).subscribe(
          () => {
            this.refresh();
            this.modalRef.close();
            this.uiService.toastSuccess('User Updated', 'The User was updated successfully.');
          }, (err) => {
            this.modalRef.close();
            this.uiService.toastError('Update User Failed', err.message || err.error.message);
          },
        ));
        break;
      case 'delete':
        this.subscriptions.push(this.userApi.deleteById(event.payload.id).subscribe(
          () => {
            this.refresh();
            this.uiService.toastSuccess('User Deleted', 'The User was deleted successfully.');
          },
          (err) => {
            this.uiService.toastError('Delete User Failed', err.message || err.error.message);
          },
        ));
        break;
      default:
        return console.log('Unknown event action', event);
    }
  }

}
