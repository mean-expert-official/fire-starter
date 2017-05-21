import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../user.service';
import { UiService } from '../../../ui/ui.service';

@Component({
  selector: 'fire-user-role-list',
  template: `
  <table class="table table-striped table-sm"
         [class.table-responsive]="!uiService.isLargeScreen">
    <thead>
      <tr>
        <th *ngFor="let header of userService.getTableHeaders('rolesForUser')">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let role of roles">
        <td nowrap>
          <button type="button"
                  class="btn btn-danger btn-sm"
                  placement="bottom"
                  ngbTooltip="Delete"
                  (click)="handleAction({ type: 'initDeleteUserFromRole', payload: { user: user, role: role } })">
            <i class="fa fa-fw fa-trash-o"></i>
          </button>
        </td>
        <td>{{ role.name }}</td>
        <td>{{ role.description }}</td>
      </tr>
    </tbody>
  </table>
  `,
})
export class UserRoleListComponent {

  @Input() roles;
  @Input() user;
  @Output() action = new EventEmitter();

  handleAction($event) {
    switch ($event.type) {
      default:
        return this.action.emit($event);
    }
  }

  constructor(
    public userService: UserService,
    public uiService: UiService,
  ) { }
}
