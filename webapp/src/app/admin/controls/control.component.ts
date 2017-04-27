import { Component, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ACL, Role } from '../../shared/sdk/models';
import { ACLApi, RoleApi } from '../../shared/sdk/services';
import { ControlFormComponent } from './form/control-form.component';
import { ControlService } from './control.service';
import { UiService } from '../../ui/ui.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'fire-control',
  templateUrl: './control.component.html',
})
export class ControlComponent implements OnDestroy {

  private modalRef;
  public controls: ACL[] = new Array<ACL>();
  public roles: Role[] = new Array<Role>();
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private modal: NgbModal,
    public uiService: UiService,
    public controlService: ControlService,
    public controlApi: ACLApi,
    public roleApi: RoleApi,
  ) {
    this.refresh();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  refresh() {
    this.subscriptions.push(this.controlApi.find().subscribe(
      (controls: ACL[]) => {
        this.controls = controls;
      }));
    this.subscriptions.push(this.roleApi.find().subscribe(
      (roles: Role[]) => {
        this.roles = roles;
      }));
  }

  showDialog(type, item, options?) {
    this.modalRef = this.modal.open(ControlFormComponent, { size: 'lg' });
    this.modalRef.componentInstance.item = item;
    this.modalRef.componentInstance.formConfig = this.controlService.getFormConfig(type, options);
    this.modalRef.componentInstance.title = (type === 'create') ? 'Create Control' : 'Update Control';
    this.subscriptions.push(this.modalRef.componentInstance.action.subscribe(event => this.handleAction(event)));
  }

  create() {
    this.showDialog('create', new ACL(), { roles: this.roles });
  }

  update(control: ACL) {
    this.showDialog('update', control, { roles: this.roles });
  }

  delete(control: ACL) {
    const question = {
      title: 'Delete Control',
      html: `
        <p class="lead">Are you sure you want to delete ACL
          <span class="font-weight-bold font-italic">${control.id}</span>?
        </p>
      `,
      confirmButtonText: 'Yes, Delete'
    };
    this.uiService.alertError(question, () => this.handleAction({ type: 'delete', payload: control }), () => { });
  }


  handleAction(event) {
    switch (event.type) {
      case 'create':
        this.subscriptions.push(this.controlApi.create(event.payload).subscribe(
          () => {
            this.refresh();
            this.modalRef.close();
            this.uiService.toastSuccess('Control Created', 'The Control was created successfully.');
          },
          (err) => {
            this.modalRef.close();
            this.uiService.toastError('Create Control Failed', err.message || err.error.message);
          },
        ));
        break;
      case 'update':
        this.subscriptions.push(this.controlApi.upsert(event.payload).subscribe(
          () => {
            this.refresh();
            this.modalRef.close();
            this.uiService.toastSuccess('Control Updated', 'The Control was updated successfully.');
          },
          (err) => {
            this.modalRef.close();
            this.uiService.toastError('Update Control Failed', err.message || err.error.message);
          },
        ));
        break;
      case 'delete':
        this.subscriptions.push(this.controlApi.deleteById(event.payload.id).subscribe(
          () => {
            this.refresh();
            this.uiService.toastSuccess('Control Deleted', 'The Control was deleted successfully.');
          },
          (err) => {
            this.uiService.toastError('Delete Control Failed', err.message || err.error.message);
          },
        ));
        break;
      default:
        return console.log('Unknown event action', event);
    }
  }

}
