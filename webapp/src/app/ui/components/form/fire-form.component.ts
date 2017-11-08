import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'fire-form',
  template: `
  <form class="formly"
        role="form"
        novalidate
        [formGroup]="form"
        (ngSubmit)="handleAction({ type: config.action || 'create', payload: item })">
    <div class="row">
      <div class="col-12">
        <formly-form class="row"
                     [model]="item"
                     [fields]="config.fields"
                     [form]="form">
        </formly-form>
      </div>
      <div [class]="config.buttonColClass || 'col-12'">
        <button type="submit"
                class="btn btn-primary btn-block">{{ config.submitButtonText || 'Save' }}
        </button>
      </div>
      <div [class]="config.buttonColClass || 'col-12'">
        <button *ngIf="config.showCancel"
                type="button"
                class="btn btn-secondary btn-block"
                (click)="handleAction({ type: 'cancel' })">Cancel
        </button>
      </div>
    </div>
  </form>
  `,
})
export class FireFormComponent {
  @Input() config;
  @Input() item;
  @Output() action = new EventEmitter();
  form: FormGroup = new FormGroup({});

  handleAction(event) {
    switch (event.type) {
      default:
        return this.action.emit(event);
    }
  }

}
