/* tslint:disable */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';

import { AccountActionTypes, AccountActions } from '../actions/account';
import { LoopbackErrorActions } from '../actions/error';
import { AccountApi } from '../services/index';

@Injectable()
export class AccountEffects extends BaseLoopbackEffects {
  /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Account specific actions
   */
  @Effect()
  protected login: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.LOGIN)
    .mergeMap((action: LoopbackAction) =>
      this.account.login(action.payload.credentials, action.payload.include, action.payload.rememberMe)
        .map((response) => new AccountActions.loginSuccess(response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.loginFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected signup: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.SIGNUP)
    .mergeMap((action: LoopbackAction) =>
      this.account.create(action.payload)
        .map((response) => new AccountActions.signupSuccess(action.payload, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.signupFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected logout: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.LOGOUT)
    .mergeMap((action: LoopbackAction) =>
      this.account.logout()
        .map(() => new AccountActions.logoutSuccess(action.meta))
        .catch((error) => concat(
          of(new AccountActions.logoutFail()),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Decorate base effects metadata
   */
  @Effect() protected create: any;
  @Effect() protected createMany: any;
  @Effect() protected findById: any;
  @Effect() protected find: any;
  @Effect() protected findOne: any;
  @Effect() protected updateAll: any;
  @Effect() protected deleteById: any;
  @Effect() protected updateAttributes: any;
  @Effect() protected upsert: any;
  @Effect() protected upsertWithWhere: any;
  @Effect() protected replaceOrCreate: any;
  @Effect() protected replaceById: any;
  @Effect() protected patchOrCreate: any;
  @Effect() protected patchAttributes: any;

  constructor(
    @Inject(Actions) public actions$: Actions,
    @Inject(AccountApi) public account: AccountApi
  ) {
    super(actions$, account, 'Account', AccountActionTypes);
  }
}
