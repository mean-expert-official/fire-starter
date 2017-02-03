import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-light bg-faded navbar-toggleable-md" style="background-color: #d9edf7;">
      <a class="navbar-brand" [routerLink]="['/']">{{appName}}</a>
      <ul class="navbar-nav  mr-auto mt-2 mt-lg-0">
        <li class="nav-item" *ngFor="let link of links">
          <a class="nav-link" routerLinkActive="active" [routerLink]="link.link">{{link.label}}</a>
        </li>
      </ul>
    </nav>
  `,
  styles: []
})
export class HeaderComponent {

  public appName = 'FireLoop Demo App'
  public links = [
    { label: 'Todos', link: ['/', 'todos'] },
    { label: 'Authentication', link: ['/', 'auth'] },
    { label: 'Notifications', link: ['/', 'notifications'] },
  ]

}
