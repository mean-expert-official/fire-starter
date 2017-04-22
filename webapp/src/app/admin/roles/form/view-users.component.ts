import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from '../role.service';

@Component({
  selector: 'fire-role-form',
  template: `
    <div class="modal-header bg-primary">
      <h4 class="modal-title">{{ title }}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <table *ngIf="users" class="table table-striped table-sm">
      <thead>
        <tr>
          <th *ngFor="let header of roleService.getUserTableHeaders()">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of users">
          <td>{{ row.user.email }}</td>
          <td>{{ row.user.firstName }}</td>
          <td>{{ row.user.lastName }}</td>
          <td>
            <button type="button" class="btn btn-danger btn-block btn-sm" placement="bottom" ngbTooltip="Delete User" (click)="handleAction({type: 'deleteUserInit', payload: { user: row.user, role: role, mapping: row.mapping } })">
              <i class="fa fa-fw fa-trash-o"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  `,
})
export class ViewUsersComponent {

  @Input() title;
  @Input() users;
  @Input() role;
  @Input() mappingId;
  @Output() action = new EventEmitter();

  handleAction($event) {
    switch ($event.type) {
      case 'cancel':
        return this.activeModal.dismiss('cancel');
      default:
        return this.action.emit($event);
    }
  }

  constructor(public activeModal: NgbActiveModal, public roleService: RoleService) { }
}
