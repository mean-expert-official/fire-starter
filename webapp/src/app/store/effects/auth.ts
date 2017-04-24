/* tslint:disable */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { AuthActionTypes, AuthActions } from '../actions/auth';
import { LoopBackAuth } from '../../shared/sdk/services';

@Injectable()
export class AuthEffects {
  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  public loadToken: Observable<Action> = this.actions$
    .ofType(AuthActionTypes.LOAD_TOKEN)
    .startWith(new AuthActions.loadToken())
    .map(() => new AuthActions.loadTokenSuccess(this.auth.getToken()));

  @Effect({ dispatch: false })
  public setToken: Observable<Action> = this.actions$
    .ofType(AuthActionTypes.SET_TOKEN)
    .map(toPayload)
    .do((payload) => {
      this.auth.setUser(payload);
      this.auth.setRememberMe(true);
      this.auth.save();

      this.store.dispatch(new AuthActions.setTokenSuccess(payload));
    });

  @Effect({ dispatch: false })
  public setUser: Observable<Action> = this.actions$
    .ofType(AuthActionTypes.SET_USER)
    .map(toPayload)
    .do((payload) => {
      let token = this.auth.getToken();
      this.auth.setUser(Object.assign(token, {
        userId: payload.id,
        user: payload
      }));
      this.auth.setRememberMe(true);
      this.auth.save();

      this.store.dispatch(new AuthActions.setUserSuccess(payload));
    });

  @Effect({ dispatch: false })
  public updateUserProperties: Observable<Action> = this.actions$
    .ofType(AuthActionTypes.UPDATE_USER_PROPERTIES)
    .map(toPayload)
    .do((payload) => {
      let token = this.auth.getToken();
      token.user = Object.assign(token.user, payload);
      this.auth.setUser(token);
      this.auth.save();

      this.store.dispatch(new AuthActions.updateUserPropertiesSuccess(payload));
    });

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private auth: LoopBackAuth
  ) { }
}
