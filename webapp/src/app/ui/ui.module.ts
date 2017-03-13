import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

import { BodyComponent } from './layout/body/body.component'
import { CardComponent } from './card/card.component'
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

import { UIService } from './ui.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    BodyComponent,
    CardComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    SidebarComponent
  ],
  exports: [
    CardComponent,
    LayoutComponent
  ],
  providers: [
    UIService
  ]
})
export class UiModule { }
