import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from '../../../shared/sdk/models/Role'

@Component({
  selector: 'app-role-list-item',
  template: `
    <div class="row my-2">
      <div class="input-group">
        <span class="input-group-addon">

        </span>
        <input class="form-control" name="role.id" [(ngModel)]="role.name" />
        <span class="input-group-btn">
          <button class="btn btn-secondary btn-sm" (click)="update.emit(role)">Save</button>
        </span>
        <span class="input-group-btn">
          <button class="btn btn-secondary btn-sm" (click)="remove.emit(role)">Remove</button>
        </span>
      </div>
    </div>
  `,
})
export class ListItemComponent {

  @Input() public role: Role;

  @Output() update = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() done = new EventEmitter();

}
