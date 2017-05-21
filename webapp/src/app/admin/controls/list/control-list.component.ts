import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ControlService } from '../control.service';
import { UiService } from '../../../ui/ui.service';

@Component({
  selector: 'fire-control-list',
  template: `
  <table class="table table-striped table-sm"
         [class.table-responsive]="!uiService.isLargeScreen">
    <thead>
      <tr>
        <th *ngFor="let header of controlService.getTableHeaders()">{{ header }}</th>
      </tr>
    </thead>
    <tbody *ngIf="controls">
      <tr *ngFor="let control of controls">
        <td nowrap>
          <button type="button"
                  class="btn btn-secondary btn-sm"
                  placement="bottom"
                  ngbTooltip="Update"
                  (click)="handleAction({ type: 'initUpdate', payload: { roles: roles, control: control } })">
            <i class="fa fa-fw fa-edit"></i>
          </button>
          <button type="button"
                  class="btn btn-danger btn-sm"
                  placement="bottom"
                  ngbTooltip="Delete"
                  (click)="handleAction({ type: 'initDelete', payload: { roles: roles, control: control } })">
            <i class="fa fa-fw fa-trash-o"></i>
          </button>
        </td>
        <td>{{ control.model }}</td>
        <td>{{ control.property }}</td>
        <td>{{ control.accessType }}</td>
        <td>{{ control.permission }}</td>
        <td>{{ control.principalType }}</td>
        <td>{{ control.principalId }}</td>
      </tr>
    </tbody>
  </table>
  `,
})
export class ControlListComponent {

  constructor(
    public activeModal: NgbActiveModal,
    public controlService: ControlService,
    public uiService: UiService,
  ) { }

  private _roles;
  @Output() action = new EventEmitter();
  @Input() controls;
  @Input()
  set roles(roles) {
    this._roles = roles;
  }

  get roles() { return this._roles; };

  handleAction(event) {
    switch (event.type) {
      case 'cancel':
        return this.activeModal.dismiss('cancel');
      default:
        return this.action.emit(event);
    }
  }


}
