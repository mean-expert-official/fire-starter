/* tslint:disable */
import { Inject, Injectable } from '@angular/core'
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';

import { UserActionTypes } from '../shared/sdk/actions/user'


@Injectable()
export class AppAuthEffects {

  @Effect()
  protected registerSuccess: Observable<Action> = this.actions$
    .ofType(UserActionTypes.REGISTER_SUCCESS)
    .map(toPayload)
    .mergeMap((payload) => {
        console.log('payload REGISTER_SUCCESS', payload)
        return Observable.of({})
      }
      // this.user.findByIdApps(payload.id, payload.fk)
      //   .map((response) => new UserActions.findByIdAppsSuccess({id: payload.id, data: response}))
      //   .catch((error) => concat(
      //     of(new UserActions.findByIdAppsFail(error)),
      //     of(new LoopbackErrorActions.error(error))
      //   ))
    );

  @Effect()
  protected registerFail: Observable<Action> = this.actions$
    .ofType(UserActionTypes.REGISTER_FAIL)
    .map(toPayload)
    .mergeMap((payload) => {
        console.log('payload REGISTER_FAIL', payload)
        return Observable.of({})
      }
      // this.user.findByIdApps(payload.id, payload.fk)
      //   .map((response) => new UserActions.findByIdAppsSuccess({id: payload.id, data: response}))
      //   .catch((error) => concat(
      //     of(new UserActions.findByIdAppsFail(error)),
      //     of(new LoopbackErrorActions.error(error))
      //   ))
    );

  constructor( @Inject(Actions) public actions$: Actions ) {}
}
