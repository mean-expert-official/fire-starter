import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { UiService } from '../../../ui/ui.service';

@Component({
  selector: 'fire-user-list',
  template: `
  <table class="table table-striped table-sm"
         [class.table-responsive]="!uiService.isLargeScreen">
    <thead>
      <tr>
        <th *ngFor="let header of userService.getTableHeaders('users')">{{ header }}</th>
      </tr>
    </thead>
    <tbody *ngIf="users">
      <tr *ngFor="let user of users">
        <td nowrap>
          <button type="button"
                  class="btn btn-secondary btn-sm"
                  placement="bottom"
                  ngbTooltip="Update"
                  (click)="handleAction({ type: 'initUpdate', payload: user })">
            <i class="fa fa-fw fa-edit"></i>
          </button>
          <button type="button"
                  class="btn btn-danger btn-sm"
                  placement="bottom"
                  ngbTooltip="Delete"
                  (click)="handleAction({ type: 'initDelete', payload: user })">
            <i class="fa fa-fw fa-trash-o"></i>
          </button>
        </td>
        <td>{{ user.email }}</td>
        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
        <td nowrap>
          <button type="button"
                  class="btn btn-secondary btn-sm"
                  placement="bottom"
                  ngbTooltip="View Roles"
                  (click)="handleAction({ type: 'viewRoles', payload: { user: user, roles: roles } })">
            <i class="fa fa-fw fa-search"></i> <span class="badge badge-primary">{{ (user.roles)?.length || 0 }}</span>
          </button>
          <button type="button"
                  class="btn btn-primary btn-sm"
                  placement="bottom"
                  ngbTooltip="Add Role"
                  (click)="handleAction({ type: 'initAddUserToRole', payload: { user: user, users: users, roles: roles } })">
            <i class="fa fa-fw fa-plus"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  `,
})
export class UserListComponent {

  @Input() users;
  @Input() roles;
  @Input() formConfig;
  @Input() item;
  @Output() action = new EventEmitter();

  handleAction(event) {
    switch (event.type) {
      case 'cancel':
        return this.activeModal.dismiss('cancel');
      default:
        return this.action.emit(event);
    }
  }

  constructor(
    public activeModal: NgbActiveModal,
    public userService: UserService,
    public uiService: UiService,
  ) { }
}
