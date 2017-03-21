import { Component, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from '../../shared/sdk/models';
import { RoleFormComponent } from './role-form.component';
import { RoleService } from './role.service';
import { UIService } from '../../ui/ui.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
})
export class RoleComponent implements OnDestroy {

  private modalRef;
  // subscriptions
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private modal: NgbModal,
    private uiService: UIService,
    private roleService: RoleService,
  ) { }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  showDialog(type, item) {
    this.modalRef = this.modal.open(RoleFormComponent, { size: 'lg' });
    this.modalRef.componentInstance.item = item;
    this.modalRef.componentInstance.formConfig = this.roleService.getFormConfig(type);
    this.modalRef.componentInstance.title = (type === 'create') ? 'Create Role' : 'Update Role';
    this.subscriptions.push(this.modalRef.componentInstance.action.subscribe(event => this.handleAction(event)));
  }

  create() {
    this.showDialog('create', new Role());
  }

  update(role: Role) {
    this.showDialog('update', role);
  }

  delete(role: Role) {
    const question = {
      title: 'Delete Role',
      html: `
        <p class="lead">Are you sure you want to delete Role
          <span class="font-weight-bold font-italic">${role.name}</span>?
        </p>
      `,
      confirmButtonText: 'Yes, Delete'
    };
    this.uiService.alertError(question, () => this.handleAction({ type: 'delete', payload: role }), () => { });
  }


  handleAction(event) {
    switch (event.type) {
      case 'create':
        this.subscriptions.push(this.roleService
          .upsert(event.payload)
          .subscribe(
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
        this.subscriptions.push(this.roleService
          .upsert(event.payload)
          .subscribe(
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
        this.subscriptions.push(this.roleService
          .delete(event.payload)
          .subscribe(
          () => {
            this.uiService.toastSuccess('Role Deleted', 'The Role was deleted successfully.');
          },
          (err) => {
            this.uiService.toastError('Delete Role Failed', err.message || err.error.message);
          },
        ));
        break;
      default:
        return console.log('Unknown event action', event);
    }
  }

}
