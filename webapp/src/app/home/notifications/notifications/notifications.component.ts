import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UIService } from '../../../ui/ui.service';

@Component({
  selector: 'app-notifications',
  template: `
    <app-card title="Notification Service">
      <button *ngFor="let button of buttons" class="btn btn-{{button.className}} mx-1" (click)="onClickService(button)">
        {{button.label}}
      </button>
    </app-card>
    <app-card title="Notification Effects">
      <button *ngFor="let button of buttons" class="btn btn-{{button.className}} mx-1" (click)="onClickEffect(button)">
        {{button.label}}
      </button>
    </app-card>
  `,
  styles: []
})
export class NotificationsComponent {

  public buttons = [
    { label: 'Success', type: 'success', className: 'success' },
    { label: 'Warning', type: 'warning', className: 'warning' },
    { label: 'Wait', type: 'wait', className: 'primary' },
    { label: 'Info', type: 'info', className: 'info' },
    { label: 'Error', type: 'error', className: 'danger' },
  ];

  static getPayload(button) {
    return {
      type: button.type,
      title: button.label,
      text: `You clicked the ${button.type} button`,
    };
  }

  onClickService(button) {
    this.uiService.toast(NotificationsComponent.getPayload(button));
  }

  onClickEffect(button) {
    return this.store.dispatch({ type: 'NOTIFY', payload: NotificationsComponent.getPayload(button) });
  }


  constructor(
    private store: Store<any>,
    private uiService: UIService,
  ) { }
}
