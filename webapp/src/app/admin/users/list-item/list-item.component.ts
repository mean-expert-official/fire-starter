import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../shared/sdk/models/User'

@Component({
  selector: 'app-user-list-item',
<<<<<<< HEAD
<<<<<<< HEAD
  templateUrl: './list-item.component.html',
=======
  template: `
    <div class="row my-2">
      <div class="input-group">
        <span class="input-group-addon">

        </span>
        <input class="form-control" name="user.id" [(ngModel)]="user" />
        <span class="input-group-btn">
          <button class="btn btn-secondary btn-sm" (click)="update.emit(user)">Save</button>
        </span>
        <span class="input-group-btn">
          <button class="btn btn-secondary btn-sm" (click)="remove.emit(user)">Remove</button>
        </span>
      </div>
    </div>
  `,
>>>>>>> base of admin module
=======
  templateUrl: './list-item.component.html',
>>>>>>> add html files
})
export class ListItemComponent {

  @Input() public user: User;

  @Output() update = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() done = new EventEmitter();

}
