import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormlyModule, FormlyBootstrapModule } from 'ng-formly';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BodyComponent } from './layout/body/body.component';
import { CardComponent } from './card/card.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { UiFormComponent } from './form/ui-form.component';
import { FormlyFieldDatePicker } from './form/formly.field.date-picker'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyBootstrapModule,
    NgbModule,
  ],
  declarations: [
    BodyComponent,
    CardComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    SidebarComponent,
    UiFormComponent,
    FormlyFieldDatePicker,
  ],
  exports: [
    CardComponent,
    LayoutComponent,
    UiFormComponent,
    FormlyModule,
    FormlyBootstrapModule
  ],
  providers: [

  ]
})
export class UiModule { }
