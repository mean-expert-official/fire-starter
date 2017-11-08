import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store, State } from '@ngrx/store';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ACL, Role, Account } from '../../sdk';
import { ControlFormComponent } from './form/control-form.component';
import { ControlService } from './control.service';
import { UiService } from '../../ui/ui.service';
import { ControlActions } from '../state/admin.state';
import * as Controls from '../state/reducers/control.reducers';

@Component({
  selector: 'fire-control',
  template: `
  <fire-card icon="ban"
             cardTitle="Controls"
             [createButton]="controlService.getCardButtons()"
             [payload]="roles | async"
             (action)="handleAction($event)">
    <fire-control-list #fcl
                       *ngIf="controls"
                       [controls]="controls | async"
                       [roles]="roles | async"
                       (action)="handleAction($event)">
    </fire-control-list>
  </fire-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlComponent implements OnDestroy {

  public admin: Observable<any>;
  public controls: Observable<any>;
  public roles: Observable<any>;
  private modalRef;
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private modal: NgbModal,
    public uiService: UiService,
    public controlService: ControlService,
    private store: Store<any>,
  ) {
    this.admin = store.select('admin');
    this.controls = this.admin.map((a) => {
      return a.controls.ids.map((id) => a.controls.entities[id]);
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
        console.log(item);
        this.modalRef = this.modal.open(ControlFormComponent, { size: 'sm' });
        this.modalRef.componentInstance.item = item.control;
        this.modalRef.componentInstance.formConfig = this.controlService.getFormConfig(type, item);
        this.modalRef.componentInstance.title = 'Create Control';
        break;
      case 'update':
        this.modalRef = this.modal.open(ControlFormComponent, { size: 'sm' });
        this.modalRef.componentInstance.item = item.control;
        this.modalRef.componentInstance.formConfig = this.controlService.getFormConfig(type, item);
        this.modalRef.componentInstance.title = 'Update Control';
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
        this.showDialog('create', { roles: event.payload, control: new ACL() });
        break;
      case 'create':
        this.store.dispatch(new ControlActions.createControl(event.payload));
        this.modalRef.close();
        break;
      case 'initUpdate':
        this.showDialog('update', event.payload);
        break;
      case 'update':
        this.store.dispatch(new ControlActions.updateControl(event.payload));
        this.modalRef.close();
        break;
      case 'initDelete':
        const question = {
          title: 'Delete Control',
          html: `
          <p class="lead">Are you sure you want to delete this control for the
            <span class="font-weight-bold font-italic">${event.payload.control.model}</span> model?
          </p>
        `,
          confirmButtonText: 'Yes, Delete'
        };
        this.uiService.alertError(question, () => this.handleAction({ type: 'delete', payload: event.payload.control }), () => { });
        break;
      case 'delete':
        this.store.dispatch(new ControlActions.deleteControl(event.payload));
        break;
      default:
        console.log('Unknown Event Action', event);
        break;
    }
  }

}
