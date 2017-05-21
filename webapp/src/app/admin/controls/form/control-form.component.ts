import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fire-control-form',
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
    <fire-form *ngIf="formConfig"
               [config]="formConfig"
               [item]="item"
               (action)="handleAction($event)">
    </fire-form>
  </div>
  `,
})
export class ControlFormComponent {

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
