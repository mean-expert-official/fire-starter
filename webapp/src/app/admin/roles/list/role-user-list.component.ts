import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoleService } from '../role.service';
import { UiService } from '../../../ui/ui.service';

@Component({
  selector: 'fire-role-user-list',
  template: `
  <table class="table table-striped table-sm"
         [class.table-responsive]="!uiService.isLargeScreen">
    <thead>
      <tr>
        <th *ngFor="let header of roleService.getTableHeaders('usersInRole')">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let user of users">
        <td nowrap>
          <button type="button"
                  class="btn btn-danger btn-sm"
                  placement="bottom"
                  ngbTooltip="Delete"
                  (click)="handleAction({ type: 'initDeleteUserFromRole', payload: { user: user, role: role } })">
            <i class="fa fa-fw fa-trash-o"></i>
          </button>
        </td>
        <td>{{ user.email }}</td>
        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
      </tr>
    </tbody>
  </table>
  `,
})
export class RoleUserListComponent {

  @Input() users;
  @Input() role;
  @Output() action = new EventEmitter();

  handleAction($event) {
    switch ($event.type) {
      default:
        return this.action.emit($event);
    }
  }

  constructor(
    public roleService: RoleService,
    public uiService: UiService,
  ) { }
}
