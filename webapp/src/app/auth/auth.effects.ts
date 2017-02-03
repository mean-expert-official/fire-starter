/* tslint:disable */
import { Inject, Injectable } from '@angular/core'
import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';

import { UserActionTypes } from '../shared/sdk/actions/user'


@Injectable()
export class AppAuthEffects {

  @Effect({ dispatch: false })
  protected registerSuccess: Observable<Action> = this.actions$
    .ofType(UserActionTypes.REGISTER_SUCCESS)
    .map(toPayload)
    .mergeMap((payload: any) => {
        this.store.dispatch({
          type: 'NOTIFY',
          payload: { type: 'success', title: 'Registered', msg: 'You are registered' }
        })
        return Observable.of({})
      }
    );

  @Effect({ dispatch: false })
  protected registerFail: Observable<Action> = this.actions$
    .ofType(UserActionTypes.REGISTER_FAIL)
    .map(toPayload)
    .mergeMap((payload) => {
        this.store.dispatch({
          type: 'NOTIFY',
          payload: { type: 'error', title: 'Registration failed', msg: payload.message }
        })
        return Observable.of({})
      }
    );

  @Effect({ dispatch: false })
  protected loginSuccess: Observable<Action> = this.actions$
    .ofType(UserActionTypes.LOGIN_SUCCESS)
    .map(toPayload)
    .mergeMap((payload: any) => {
        this.store.dispatch({
          type: 'NOTIFY',
          payload: { type: 'success', title: 'Logged in', msg: 'You are logged in' }
        })
        return Observable.of({})
      }
    );

  @Effect({ dispatch: false })
  protected loginFail: Observable<Action> = this.actions$
    .ofType(UserActionTypes.LOGIN_FAIL)
    .map(toPayload)
    .mergeMap((payload) => {
        this.store.dispatch({
          type: 'NOTIFY',
          payload: { type: 'error', title: 'Login failed', msg: payload.message }
        })
        return Observable.of({})
      }
    );

  constructor(
    @Inject(Actions) public actions$: Actions,
    private store: Store<any>,
  ) {}
}
