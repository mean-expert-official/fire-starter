import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <app-header></app-header>
    <div class="container">
      <ng-content></ng-content>
    </div>
    <app-footer></app-footer>
  `,
})
export class LayoutComponent {

}
