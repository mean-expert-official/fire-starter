import { Component, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireLoopRef, FireUser, SDKToken } from '../shared/sdk/models';
import { RealTime, FireUserApi } from '../shared/sdk/services';
import { UIService } from '../ui/ui.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  template: `
    <app-card icon="heartbeat" title="Status">
      <app-auth-status [loggedIn]="userApi.isAuthenticated()" [user]="userApi.getCurrentToken().user" (logout)="processLogout($event)"></app-auth-status>
    </app-card>
    <div *ngIf="!userApi.isAuthenticated()" class="row">
      <div class="col-lg-6">
        <app-card icon="sign-in" title="Login">
          <app-auth-login (login)="processLogin($event)"></app-auth-login>
        </app-card>
      </div>
      <div class="col-lg-6">
        <app-card icon="registered" title="Register">
          <app-auth-register (register)="processRegistration($event)"></app-auth-register>
        </app-card>
      </div>
    </div>
  `,
  styles: []
})
export class AuthComponent implements OnDestroy {

  private subscriptions: Subscription[] = new Array<Subscription>();
  public user: FireUser;
  private userRef: FireLoopRef<FireUser>;
  private token: any;

  constructor(
    private uiService: UIService,
    public userApi: FireUserApi
  ) {

  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  processLogin(event: any) {
    this.subscriptions.push(this.userApi.login(event).subscribe(
      (token: SDKToken) => {
        this.uiService.toastSuccess('Login Success', 'You have logged in successfully.');
      },
      (err: any) => {
        this.uiService.toastError('Login Failed', err.message || err.error.message);
      }));
  }

  processRegistration(event: any) {
    this.subscriptions.push(this.userApi.create(event).subscribe(
      (token: any) => {
        console.log(token);
      },
      (err: any) => {
        this.uiService.toastError('Registration Failed', err.message || err.error.message);
      }));
  }

  processLogout(event: any) {
    this.subscriptions.push(this.userApi.logout().subscribe(
      () => {
        this.uiService.toastSuccess('Logout Success', 'You have logged out successfully');
      },
      (err: any) => {
        this.uiService.toastError('Logout Failed', err.message || err.error.message);
      }));
  }

}
