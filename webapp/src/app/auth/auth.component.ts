import { Component } from '@angular/core';

@Component({
  template: `
    <app-card title="Status">
      <app-auth-status></app-auth-status>
    </app-card>
    <div class="row">
      <div class="col-md-6">
        <app-card title="Login">
          <app-auth-login></app-auth-login>
        </app-card>
      </div>
      <div class="col-md-6">
        <app-card title="Register">
          <app-auth-register></app-auth-register>
        </app-card>
      </div>
    </div>
  `,
  styles: []
})
export class AuthComponent {

}
