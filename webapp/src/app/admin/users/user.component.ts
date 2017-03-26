import { Component, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../shared/sdk/models';
import { UserFormComponent } from './user-form.component';
import { UserService } from './user.service';
import { UIService } from '../../ui/ui.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnDestroy {

  private modalRef;
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private modal: NgbModal,
    private uiService: UIService,
    private userService: UserService,
  ) { }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  showDialog(type, item) {
    this.modalRef = this.modal.open(UserFormComponent, { size: 'lg' });
    this.modalRef.componentInstance.item = item;
    this.modalRef.componentInstance.formConfig = this.userService.getFormConfig(type);
    this.modalRef.componentInstance.title = (type === 'create') ? 'Create User' : 'Update User';
    this.subscriptions.push(this.modalRef.componentInstance.action.subscribe(event => this.handleAction(event)));
  }

  create() {
    this.showDialog('create', new User());
  }

  update(user: User) {
    this.showDialog('update', user);
  }

  delete(user: User) {
    const question = {
      title: 'Delete User',
      html: `
        <p class="lead">Are you sure you want to delete User
          <span class="font-weight-bold font-italic">${user.username}</span>?
        </p>
      `,
      confirmButtonText: 'Yes, Delete'
    };
    this.uiService.alertError(question, () => this.handleAction({ type: 'delete', payload: user }), () => { });
  }

  handleAction(event) {
    switch (event.type) {
      case 'create':
        this.subscriptions.push(this.userService
          .upsert(event.payload).subscribe(() => {
            this.modalRef.close();
            this.uiService.toastSuccess('User Created', 'The User was created successfully.');
          }, (err) => {
            this.modalRef.close();
            this.uiService.toastError('Create User Failed', err.message || err.error.message);
          },
        ));
        break;
      case 'update':
        this.subscriptions.push(this.userService
          .upsert(event.payload).subscribe(() => {
            this.modalRef.close();
            this.uiService.toastSuccess('User Updated', 'The User was updated successfully.');
          }, (err) => {
            this.modalRef.close();
            this.uiService.toastError('Update User Failed', err.message || err.error.message);
          },
        ));
        break;
      case 'delete':
        this.subscriptions.push(this.userService
          .delete(event.payload).subscribe(() => {
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
