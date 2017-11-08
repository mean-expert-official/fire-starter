import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fire-role-form',
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
    <fire-role-user-list *ngIf="items"
                         [users]="items"
                         [role]="item"
                         (action)="handleAction($event)">
    </fire-role-user-list>
    <fire-form *ngIf="formConfig"
               [config]="formConfig"
               [item]="item"
               (action)="handleAction($event)">
    </fire-form>
  </div>
  `,
})
export class RoleFormComponent {

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
        let user = this.items.filter(user => user.id === event.payload.user.id)[0];
        let mapping = event.payload.role.principals.filter(p => p.principalId === event.payload.user.id)[0];
        event.payload.mappingId = mapping.id;
        return this.action.emit(event);
      }
      default: {
        return this.action.emit(event);
      }
    }
  }

}
