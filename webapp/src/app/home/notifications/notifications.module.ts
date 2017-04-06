import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsComponent } from './notifications.component';
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
  ]
})
export class NotificationsModule { }
