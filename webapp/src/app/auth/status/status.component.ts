import { Component } from '@angular/core';
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-auth-status',
  template: `
    <div *ngIf="loggedIn" class="alert alert-success mb-0" role="alert">
      <strong>Success!</strong> You are logged in as {{user?.email}}!
    </div>
    <div *ngIf="!loggedIn" class="alert alert-danger mb-0" role="alert">
      <strong>Hello!</strong> You are not logged in!
    </div>
  `,
})
export class StatusComponent {

  loggedIn: boolean = false
  user: any = {}

  constructor(private store: Store<any>) {
    this.store
      .select('auth')
      .subscribe((res: any) => {
        if (res.id) {
          this.loggedIn = true
          this.user = res.user
        }
      })
  }
}
