import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fire-user-form',
  template: `
  <div class="modal-header bg-primary">
    <h4 class="modal-title">{{ title }}</h4>
    <button type="button"
            class="close"
            aria-label="Close"
            (click)="handleAction({ type: 'cancel' })">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <fire-user-role-list *ngIf="items"
                         [roles]="items"
                         [user]="item"
                         (action)="handleAction($event)">
    </fire-user-role-list>
    <fire-form *ngIf="!items"
               [config]="formConfig"
               [item]="item"
               (action)="handleAction($event)">
    </fire-form>
  </div>
  `,
})
export class UserFormComponent {

  @Input() title;
  @Input() formConfig;
  @Input() item;
  @Input() items;
  @Output() action = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) { }

  handleAction(event) {
    switch (event.type) {
      case 'cancel': {
        return this.activeModal.dismiss('cancel');
      }
      case 'initDeleteUserFromRole': {
        let role = this.items.filter(role => role.id === event.payload.role.id)[0];
        console.log(role);
        let mapping = role.principals.filter(p => p.principalId === event.payload.user.id)[0];
        event.payload.mappingId = mapping.id;
        console.log(mapping);
        return this.action.emit(event);
      }
      default: {
        return this.action.emit(event);
      }
    }
  }

}
