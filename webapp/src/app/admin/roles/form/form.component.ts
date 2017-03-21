import { Component, EventEmitter, Output } from '@angular/core';
import { Role } from '../../../shared/sdk/models/Role'

@Component({
  selector: 'app-role-form',
  template: `
    <form (submit)="submit()">
      <div class="input-group">
        <input class="form-control" required name="role" type="text" [(ngModel)]="role.text" placeholder="Add Role" />
        <span class="input-group-btn">
          <button class="btn btn-secondary">Add Role</button>
        </span>
      </div>
    </form>
  `,
})
export class FormComponent {

  public role: Role = new Role();

  submit() {
    this.create.emit(this.role);
    this.role = new Role();
  }

  @Output() create = new EventEmitter();
}
