import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UiModule } from '../../ui/ui.module';

import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
  ],
  declarations: [
    DashboardComponent,
  ],
  exports: [
    DashboardComponent
  ],
})
export class DashboardModule { }
