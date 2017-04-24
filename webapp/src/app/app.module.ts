import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastyModule } from 'ng2-toasty';

import { UiModule } from './ui/ui.module';
import { UiService } from './ui/ui.service';
import { CoreModule } from './core/core.module';
import { ShellComponent } from './core/shell/shell.component';

@NgModule({
  imports: [BrowserModule, ToastyModule.forRoot(), UiModule, CoreModule],
  exports: [ToastyModule],
  declarations: [ShellComponent],
  bootstrap: [ShellComponent]
})

export class AppModule { }
