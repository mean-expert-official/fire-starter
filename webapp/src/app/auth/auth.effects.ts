/* tslint:disable */
import { get } from 'lodash';
import { Inject, Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { UiService, NavItem } from '../ui/ui.service';
import { AccountActionTypes } from '../shared/sdk/actions/account';

@Injectable()
export class AppAuthEffects {

  constructor(
    @Inject(Actions) public actions$: Actions,
    private store: Store<any>,
    private uiService: UiService,
    private router: Router,
  ) { }

  @Effect({ dispatch: false })
  protected registerSuccess: Observable<Action> = this.actions$
    .ofType(AccountActionTypes.REGISTER_SUCCESS)
    .do((action) => {
      this.uiService.alertSuccess({ title: 'Registration Success', text: get(action, 'payload.message') });
    });

  @Effect({ dispatch: false })
  protected registerFail: Observable<Action> = this.actions$
    .ofType(AccountActionTypes.REGISTER_FAIL)
    .do((action) => {
      this.uiService.alertError({ title: 'Registration Failure', text: get(action, 'payload.message') });
    });

  @Effect({ dispatch: false })
  protected loginSuccess: Observable<Action> = this.actions$
    .ofType(AccountActionTypes.LOGIN_SUCCESS)
    .do((action) => {
      this.uiService.alertSuccess({ title: 'Login Success', text: get(action, 'payload.message') });
    });

  @Effect({ dispatch: false })
  protected loginFail: Observable<Action> = this.actions$
    .ofType(AccountActionTypes.LOGIN_FAIL)
    .do((action) => {
      this.uiService.alertError({ title: 'Login Failure', text: get(action, 'payload.message') });
    });

  @Effect({ dispatch: false })
  protected logoutSuccess: Observable<Action> = this.actions$
    .ofType(AccountActionTypes.LOGOUT_SUCCESS)
    .do((action) => {
      this.uiService.alertSuccess({ title: 'Logout Success', text: get(action, 'payload.message') });
      this.router.navigate(['/home/auth/login']);
    });

  @Effect({ dispatch: false })
  protected logoutFail: Observable<Action> = this.actions$
    .ofType(AccountActionTypes.LOGOUT_FAIL)
    .do((action) => {
      this.uiService.alertError({ title: 'Logout Failure', text: get(action, 'payload.message') });
    });

}
