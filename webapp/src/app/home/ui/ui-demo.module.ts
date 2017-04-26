import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UiDemoComponent } from './ui-demo.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UiModule } from '../../ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule
  ],
  declarations: [
    UiDemoComponent,
    NotificationsComponent,
  ],
  exports: [
    UiDemoComponent,
  ],
  providers: [
  ]
})
export class UiDemoModule { }
