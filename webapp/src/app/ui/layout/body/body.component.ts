import { Component } from '@angular/core';

@Component({
  selector: 'app-body',
  template: `
    <div class="container mt-3">        
      <router-outlet></router-outlet>
    </div>
  `,
})
export class BodyComponent {}
