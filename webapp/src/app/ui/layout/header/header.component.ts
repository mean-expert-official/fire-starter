import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-light bg-faded navbar-toggleable-md">
      <a class="navbar-brand">FireLoop Demo App</a>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link">Home <span class="sr-only">(current)</span></a>
        </li>
      </ul>
    </nav>
  `,
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
