import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from '../role.service';
import { UiService } from '../../../ui/ui.service';

@Component({
  selector: 'fire-role-list',
  template: `
  <table class="table table-striped table-sm"
         [class.table-responsive]="!uiService.isLargeScreen">
    <thead>
      <tr>
        <th *ngFor="let header of roleService.getTableHeaders('roles')">{{ header }}</th>
      </tr>
    </thead>
    <tbody *ngIf="roles">
      <tr *ngFor="let role of roles">
        <td nowrap>
          <button type="button"
                  class="btn btn-secondary btn-sm"
                  placement="bottom"
                  ngbTooltip="Update"
                  (click)="handleAction({ type: 'initUpdate', payload: role })">
            <i class="fa fa-fw fa-edit"></i>
          </button>
          <button type="button"
                  class="btn btn-danger btn-sm"
                  placement="bottom"
                  ngbTooltip="Delete"
                  (click)="handleAction({ type: 'initDelete', payload: role })">
            <i class="fa fa-fw fa-trash-o"></i>
          </button>
        </td>
        <td>{{ role.name }}</td>
        <td>{{ role.description }}</td>
        <td nowrap>
          <button type="button"
                  class="btn btn-secondary btn-sm"
                  placement="bottom"
                  ngbTooltip="View Principals"
                  (click)="handleAction({ type: 'viewPrincipals', payload: { role: role, users: users } })">
            <i class="fa fa-fw fa-search"></i> <span class="badge badge-primary">{{ (role.principals)?.length || 0 }}</span>
          </button>
          <button type="button"
                  class="btn btn-primary btn-sm"
                  placement="bottom"
                  ngbTooltip="Add Principal"
                  (click)="handleAction({ type: 'initAddUserToRole', payload: { role: role, users: users, roles: roles } })">
            <i class="fa fa-fw fa-plus"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  `,
})
export class RoleListComponent {

  @Input() users;
  @Input() roles;
  @Input() item;
  @Output() action = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    public roleService: RoleService,
    public uiService: UiService,
  ) { }

  handleAction(event) {
    switch (event.type) {
      case 'cancel':
        return this.activeModal.dismiss('cancel');
      default:
        return this.action.emit(event);
    }
  }


}
