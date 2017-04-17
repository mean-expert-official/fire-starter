import { Component, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireLoopRef, ACL } from '../../shared/sdk/models';
import { RealTime } from '../../shared/sdk/services/core/real.time';
import { ControlFormComponent } from './control-form.component';
import { ControlService } from './control.service';
import { UIService } from '../../ui/ui.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
})
export class ControlComponent implements OnDestroy {

  private modalRef;
  public controls: ACL[] = new Array<ACL>();
  private controlRef: FireLoopRef<ACL>;
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private modal: NgbModal,
    public uiService: UIService,
    public controlService: ControlService,
    private rt: RealTime,
  ) {
    this.subscriptions.push(
      this.rt.onReady().subscribe(
        (fire: any) => {
          this.controlRef = this.rt.FireLoop.ref<ACL>(ACL);
          this.subscriptions.push(this.controlRef.on('change').subscribe(
            (controls: ACL[]) => {
              this.controls = controls;
            }));
        }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  showDialog(type, item) {
    this.modalRef = this.modal.open(ControlFormComponent, { size: 'lg' });
    this.modalRef.componentInstance.item = item;
    this.modalRef.componentInstance.formConfig = this.controlService.getFormConfig(type);
    this.modalRef.componentInstance.title = (type === 'create') ? 'Create Control' : 'Update Control';
    this.subscriptions.push(this.modalRef.componentInstance.action.subscribe(event => this.handleAction(event)));
  }

  create() {
    this.showDialog('create', new ACL());
  }

  update(control: ACL) {
    this.showDialog('update', control);
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
        this.subscriptions.push(this.controlRef.create(event.payload).subscribe(
          () => {
            this.modalRef.close();
            this.uiService.toastSuccess('ACL Created', 'The ACL was created successfully.');
          },
          (err) => {
            this.modalRef.close();
            this.uiService.toastError('Create ACL Failed', err.message || err.error.message);
          },
        ));
        break;
      case 'update':
        this.subscriptions.push(this.controlRef.upsert(event.payload).subscribe(
          () => {
            this.modalRef.close();
            this.uiService.toastSuccess('ACL Updated', 'The ACL was updated successfully.');
          },
          (err) => {
            this.modalRef.close();
            this.uiService.toastError('Update ACL Failed', err.message || err.error.message);
          },
        ));
        break;
      case 'delete':
        this.subscriptions.push(this.controlRef.remove(event.payload).subscribe(
          () => {
            this.uiService.toastSuccess('ACL Deleted', 'The ACL was deleted successfully.');
          },
          (err) => {
            this.uiService.toastError('Delete ACL Failed', err.message || err.error.message);
          },
        ));
        break;
      default:
        return console.log('Unknown event action', event);
    }
  }

}
