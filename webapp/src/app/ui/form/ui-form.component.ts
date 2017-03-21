import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ui-form',
  templateUrl: './ui-form.component.html',
})
export class UiFormComponent {
  form: FormGroup = new FormGroup({});
  @Input() config;
  @Input() item;
  @Output() action = new EventEmitter();

}
