import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UiService } from '../../../ui/ui.service';

@Component({
  selector: 'fire-notifications',
  template: `
    <div class="row">
      <div class="col-12 mb-3">
        <h4>Toasty</h4>
        <hr>
        <div class="row align-items-center justify-content-center">
          <div *ngFor="let button of toastyButtons" class="col-12 col-md-6 col-lg-4">
            <button type="button" class="btn btn-block btn-{{button.className}} mb-3" (click)="onClickService(button)">
              {{button.label}}
            </button>
          </div>
        </div>
      </div>
      <div class="col-12">
        <h4>SweetAlert2</h4>
        <hr>
        <div class="row align-items-center justify-content-center">
          <div *ngFor="let button of salButtons" class="col-12 col-md-6 col-lg-4">
            <button type="button" class="btn btn-block btn-{{button.className}} mb-3" (click)="onClickService(button)">
              {{button.label}}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class NotificationsComponent {

  public toastyButtons = [
    { alertType: 'toasty', label: 'Success', type: 'success', className: 'success' },
    { alertType: 'toasty', label: 'Warning', type: 'warning', className: 'warning' },
    { alertType: 'toasty', label: 'Wait', type: 'wait', className: 'primary' },
    { alertType: 'toasty', label: 'Info', type: 'info', className: 'info' },
    { alertType: 'toasty', label: 'Error', type: 'error', className: 'danger' },
  ]

  public salButtons = [
    { alertType: 'sal', label: 'Success', type: 'success', className: 'success' },
    { alertType: 'sal', label: 'Warning', type: 'warning', className: 'warning' },
    { alertType: 'sal', label: 'Question', type: 'question', className: 'primary' },
    { alertType: 'sal', label: 'Info', type: 'info', className: 'info' },
    { alertType: 'sal', label: 'Error', type: 'error', className: 'danger' },
  ];

  static getPayload(button) {
    switch (button.alertType) {
      case 'toasty':
        return {
          type: button.type,
          title: button.label,
          msg: `You clicked the ${button.type} button`,
        };
      case 'sal':
        return {
          type: button.type,
          title: button.label,
          text: `You clicked the ${button.type} button`,
          confirmButtonClass: `btn btn-lg btn-${button.className}`
        };
      default:
        return console.log('Unknown alertType', button.alertType);
    }

  }

  onClickService(button) {
    switch (button.alertType) {
      case 'toasty':
        return this.uiService.toast(NotificationsComponent.getPayload(button));
      case 'sal':
        return this.uiService.alert(NotificationsComponent.getPayload(button));
      default:
        return console.log('Unknown alertType', button.alertType);
    }
  }

  constructor(
    private uiService: UiService,
  ) { }
}
