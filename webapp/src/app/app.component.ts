import { Component } from '@angular/core';
import { LoopBackConfig } from './shared/sdk/index';

@Component({
  selector: 'app-root',
  template: `
    <app-layout></app-layout>
    <ng2-toasty></ng2-toasty>
  `,

})
export class AppComponent {
  constructor() {
    LoopBackConfig.setBaseURL('//127.0.0.1:3000');
    LoopBackConfig.setApiVersion('api');
  }
}
