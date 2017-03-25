import { Component, AfterViewInit, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Field } from 'ng-formly';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

@Component({
  selector: 'ui-formly-field-datepicker',
  template: `
  <div class="form-group">
    <div class="input-group">
      <input class="form-control" placeholder="mm/dd/yyyy" name="dp" [formControl]="formControl" ngbDatepicker #d="ngbDatepicker">
      <div class="input-group-addon" (click)="d.toggle()" [style.cursor]="'pointer'">
        <i class="fa fa-fw fa-calendar"></i>
      </div>
    </div>
  </div>
  <pre *ngIf="model">{{ d }}</pre>
  `,
})
export class FormlyFieldDatePicker extends Field implements OnChanges {
  model: any = {};
  formControl: FormControl;
  date: NgbDateStruct;
  dateFormatter: NgbDateParserFormatter;

  ngOnChanges() {
    console.log(this.model[this.key]);
    this.model[this.key] = this.dateFormatter.format(this.model[this.key]);
    // this.model = this.dateFormatter.format(this.model) || null;
  }

  dateChange($event) {
    console.log($event);
  }

  selectToday() {
    this.model = {
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear()
    }
  }

}
