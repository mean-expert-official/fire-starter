import { Component } from '@angular/core';
import { UiService } from './ui/ui.service';

@Component({
  selector: 'app-root',
  template: `
    <app-layout></app-layout>
    <ng2-toasty [position]="'bottom-right'"></ng2-toasty>
  `,

})
export class AppComponent {

  constructor(public uiService: UiService) {

  }

}
