import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationEffects } from './state/notification.effects';
import { UiModule } from '../../ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
  ],
  declarations: [
    NotificationsComponent,
  ],
  exports: [
    NotificationsComponent,
  ],
  providers: [
    NotificationEffects,
  ]
})
export class NotificationsModule { }
