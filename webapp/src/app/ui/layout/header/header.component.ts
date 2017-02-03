import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-light bg-faded navbar-toggleable-md">
      <a class="navbar-brand" [routerLink]="['/']">FireLoop Demo App</a>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" *ngFor="let link of links">
          <a class="nav-link" routerLinkActive="active" [routerLink]="link.link">{{link.label}}</a>
        </li>
      </ul>
    </nav>
  `,
  styles: []
})
export class HeaderComponent {

  public links = [
    { label: 'Todos', link: ['/', 'todos'] },
    { label: 'Authentication', link: ['/', 'auth'] },
  ]

}
