import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'fire-auth-status',
  template: `
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12">
          <div *ngIf="(auth | async).id" class="alert alert-success text-center" role="alert">
            <strong>Success!</strong> You are logged in as <strong>{{ (auth | async)?.user.email }}!</strong>
          </div>
          <div *ngIf="!(auth | async).id" class="alert alert-danger text-center" role="alert">
            <strong>Hello!</strong> You are not logged in!
          </div>
        </div>
        <div *ngIf="(auth | async).id" class="col-12 bg-info text-white mb-3">
          <pre class="text-white mb-0">{{ auth | async | json }}</pre>
        </div>
      </div>
    </div>
  `,
})
export class StatusComponent {

  public auth: Observable<any>;

  constructor(private store: Store<any>) {
    this.auth = this.store.select('auth');
  }

}
