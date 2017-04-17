import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-role-form',
  template: `
    <div class="modal-header bg-primary">
      <h4 class="modal-title">{{ title }}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <ui-form #uiForm [config]="formConfig" [item]="item" (action)="handleAction($event)"></ui-form>
    </div>
  `,
})
export class RoleFormComponent {

  @Input() title;
  @Input() formConfig;
  @Input() item;
  @Output() action = new EventEmitter();

  handleAction($event) {
    switch ($event.type) {
      case 'cancel':
        return this.activeModal.dismiss('cancel');
      default:
        return this.action.emit($event);
    }
  }

  constructor(public activeModal: NgbActiveModal) { }
}
