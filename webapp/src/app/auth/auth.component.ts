import { Component, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireLoopRef, Account, SDKToken } from '../shared/sdk/models';
import { RealTime, AccountApi } from '../shared/sdk/services';
import { Store } from '@ngrx/store';
import { UiService, NavItem } from '../ui/ui.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  template: `
  <div class="row align-items-center justify-content-center">
    <div class="col-12 col-lg-8">
      <fire-card [icon]="userApi.isAuthenticated() ? 'unlock' : 'lock'" title="Auth Status">
        <fire-auth-status></fire-auth-status>
      </fire-card>
    </div>
    <div class="col-12 col-lg-8">
      <fire-card icon="magic"
                title="Auth Actions"
                [nav]="nav">
        <router-outlet></router-outlet>
      </fire-card>
    </div>
  </div>
  `,
  styles: []
})
export class AuthComponent implements OnDestroy {

  private subscriptions: Subscription[] = new Array<Subscription>();
  public user: Account;
  private userRef: FireLoopRef<Account>;
  private token: any;
  public nav: NavItem[];

  constructor(
    private uiService: UiService,
    public userApi: AccountApi,
    public router: Router
  ) {
    this.nav = [
      { name: 'Login', link: '/home/auth/login', icon: 'sign-in' },
      { name: 'Register', link: '/home/auth/register', icon: 'registered' }
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  processLogin(event: any) {
    this.subscriptions.push(this.userApi.login(event).subscribe(
      (token: SDKToken) => {
        let sidebarNav = this.uiService.getSidebarNav();
        sidebarNav[1].icon = 'unlock';
        this.uiService.setSidebarNav(sidebarNav);
        this.uiService.toastSuccess('Login Success', 'You have logged in successfully.');
      },
      (err: any) => {
        this.uiService.toastError('Login Failed', err.message || err.error.message);
      }));
  }

  processLogout(event: any) {
    this.subscriptions.push(this.userApi.logout().subscribe(
      () => {
        let sidebarNav = this.uiService.getSidebarNav();
        sidebarNav[1].icon = 'lock';
        this.uiService.setSidebarNav(sidebarNav);
        this.uiService.toastSuccess('Logout Success', 'You have logged out successfully');
      },
      (err: any) => {
        this.uiService.toastError('Logout Failed', err.message || err.error.message);
      }));
  }

}
