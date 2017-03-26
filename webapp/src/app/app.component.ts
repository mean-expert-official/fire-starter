import { Component } from '@angular/core';
import { LoopBackConfig } from './shared/sdk/index';
import { UIService } from './ui/ui.service';

@Component({
  selector: 'app-root',
  template: `
    <app-layout></app-layout>
    <ng2-toasty></ng2-toasty>
  `,

})
export class AppComponent {

  constructor(private uiService: UIService) {

  }

}
