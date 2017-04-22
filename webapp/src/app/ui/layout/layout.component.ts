import { Component } from '@angular/core';

@Component({
  selector: 'fire-layout',
  template: `
    <fire-header></fire-header>
    <fire-sidebar></fire-sidebar>
    <fire-body></fire-body>
    <fire-footer></fire-footer>
  `,
})
export class LayoutComponent {}
