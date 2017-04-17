import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auth-status',
  template: `
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12">
          <div *ngIf="loggedIn" class="alert alert-success text-center" role="alert">
            <strong>Success!</strong> You are logged in as <strong>{{user?.email}}!</strong>
          </div>
          <div *ngIf="!loggedIn" class="alert alert-danger text-center" role="alert">
            <strong>Hello!</strong> You are not logged in!
          </div>
        </div>
        <div *ngIf="user" class="col-12 bg-info text-white mb-3">
          <pre class="text-white mb-0">{{ user | json }}</pre>
        </div>
        <div *ngIf="user" class="col">
          <button class="btn btn-danger btn-block" (click)="submit()">Logout</button>
        </div>
      </div>
    </div>
  `,
})
export class StatusComponent {

  @Input() loggedIn: boolean = false;
  @Input() user: any = {};
  @Output() logout = new EventEmitter();

  constructor() {

  }

  submit() {
    this.logout.emit({ email: this.user.email });
  }
}
