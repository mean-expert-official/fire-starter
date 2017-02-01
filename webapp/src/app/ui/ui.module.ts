import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    LayoutComponent
  ],
})
export class UiModule { }
