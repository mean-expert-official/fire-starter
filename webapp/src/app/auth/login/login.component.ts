import { Component, Output, EventEmitter } from '@angular/core';
import { FormService } from '../../ui/form/ui-form.service';

@Component({
  selector: 'app-auth-login',
  template: `
    <form>
      <div class="form-group">
        <input
          [(ngModel)]="credentials.email"
          type="email"
          class="form-control"
          id="email"
          name="email"
          placeholder="Email">
      </div>
      <div class="form-group">
        <input
          [(ngModel)]="credentials.password"
          type="password"
          class="form-control"
          id="password"
          name="password"
          placeholder="Password">
      </div>
      <button type="submit"  (click)="submit()" class="btn btn-primary btn-block">Login</button>
    </form>
  `,
})
export class LoginComponent {

  @Output() login = new EventEmitter();
  public credentials = {
    email: null,
    password: null,
  }

  constructor(private formService: FormService) { }

  submit() {
    this.login.emit(this.credentials);
  }

}
