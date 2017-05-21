import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormlyModule, FormlyBootstrapModule } from 'ng-formly';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2BreadcrumbModule } from 'ng2-breadcrumb/ng2-breadcrumb';

import { BodyComponent } from './layout/body/body.component';
import { FireCardComponent } from './components/card/fire-card.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FireFormComponent } from './components/form/fire-form.component';
import { FormlyFieldDatePicker } from './components/form/formly.field.date-picker'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyBootstrapModule,
    NgbModule,
    Ng2BreadcrumbModule.forRoot(),
  ],
  declarations: [
    BodyComponent,
    FireCardComponent,
    FireFormComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    SidebarComponent,
    FormlyFieldDatePicker,
  ],
  exports: [
    FireCardComponent,
    FireFormComponent,
    LayoutComponent,
    FormlyModule,
    FormlyBootstrapModule,
    NgbModule
  ],
  providers: [

  ]
})
export class UiModule { }
