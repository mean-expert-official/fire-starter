import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CardComponent } from './card/card.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    CardComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    CardComponent,
    LayoutComponent
  ],
})
export class UiModule { }
