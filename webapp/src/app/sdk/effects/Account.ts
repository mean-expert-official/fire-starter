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
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';

import { AccountActionTypes, AccountActions } from '../actions/Account';
import { LoopbackErrorActions } from '../actions/error';
import { AccountApi } from '../services/index';

@Injectable()
export class AccountEffects extends BaseLoopbackEffects {
  @Effect()
  protected findByIdAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.FIND_BY_ID_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.findByIdAccessTokens(action.payload.id, action.payload.fk)
        .map((response) => new AccountActions.findByIdAccessTokensSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.findByIdAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.DESTROY_BY_ID_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.destroyByIdAccessTokens(action.payload.id, action.payload.fk)
        .map((response) => new AccountActions.destroyByIdAccessTokensSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new AccountActions.destroyByIdAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.UPDATE_BY_ID_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.updateByIdAccessTokens(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new AccountActions.updateByIdAccessTokensSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.updateByIdAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected findByIdRoles: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.FIND_BY_ID_ROLES)
    .mergeMap((action: LoopbackAction) =>
      this.account.findByIdRoles(action.payload.id, action.payload.fk)
        .map((response) => new AccountActions.findByIdRolesSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.findByIdRolesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdRoles: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.DESTROY_BY_ID_ROLES)
    .mergeMap((action: LoopbackAction) =>
      this.account.destroyByIdRoles(action.payload.id, action.payload.fk)
        .map((response) => new AccountActions.destroyByIdRolesSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new AccountActions.destroyByIdRolesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdRoles: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.UPDATE_BY_ID_ROLES)
    .mergeMap((action: LoopbackAction) =>
      this.account.updateByIdRoles(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new AccountActions.updateByIdRolesSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.updateByIdRolesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected linkRoles: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.LINK_ROLES)
    .mergeMap((action: LoopbackAction) =>
      this.account.linkRoles(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new AccountActions.linkRolesSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.linkRolesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected unlinkRoles: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.UNLINK_ROLES)
    .mergeMap((action: LoopbackAction) =>
      this.account.unlinkRoles(action.payload.id, action.payload.fk)
        .map((response) => new AccountActions.unlinkRolesSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new AccountActions.unlinkRolesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.GET_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.getAccessTokens(action.payload.id, action.payload.filter)
        .map((response) => new AccountActions.getAccessTokensSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.getAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.CREATE_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.createAccessTokens(action.payload.id, action.payload.data)
        .map((response) => new AccountActions.createAccessTokensSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.createAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.DELETE_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.deleteAccessTokens(action.payload.id)
        .map((response) => new AccountActions.deleteAccessTokensSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new AccountActions.deleteAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getRoles: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.GET_ROLES)
    .mergeMap((action: LoopbackAction) =>
      this.account.getRoles(action.payload.id, action.payload.filter)
        .map((response) => new AccountActions.getRolesSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.getRolesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createRoles: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.CREATE_ROLES)
    .mergeMap((action: LoopbackAction) =>
      this.account.createRoles(action.payload.id, action.payload.data)
        .map((response) => new AccountActions.createRolesSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.createRolesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deleteRoles: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.DELETE_ROLES)
    .mergeMap((action: LoopbackAction) =>
      this.account.deleteRoles(action.payload.id)
        .map((response) => new AccountActions.deleteRolesSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new AccountActions.deleteRolesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected login: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.LOGIN)
    .mergeMap((action: LoopbackAction) =>
      this.account.login(action.payload.credentials, action.payload.include)
        .map((response) => new AccountActions.loginSuccess(response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.loginFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected logout: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.LOGOUT)
    .mergeMap((action: LoopbackAction) =>
      this.account.logout()
        .map((response) => new AccountActions.logoutSuccess(action.meta))
        .catch((error) => concat(
          of(new AccountActions.logoutFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected verify: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.VERIFY)
    .mergeMap((action: LoopbackAction) =>
      this.account.verify(action.payload.id)
        .map((response) => new AccountActions.verifySuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new AccountActions.verifyFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected confirm: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.CONFIRM)
    .mergeMap((action: LoopbackAction) =>
      this.account.confirm(action.payload.uid, action.payload.token, action.payload.redirect)
        .map((response) => new AccountActions.confirmSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new AccountActions.confirmFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected resetPassword: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.RESET_PASSWORD)
    .mergeMap((action: LoopbackAction) =>
      this.account.resetPassword(action.payload.options)
        .map((response) => new AccountActions.resetPasswordSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new AccountActions.resetPasswordFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected changePassword: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.CHANGE_PASSWORD)
    .mergeMap((action: LoopbackAction) =>
      this.account.changePassword(action.payload.oldPassword, action.payload.newPassword)
        .map((response) => new AccountActions.changePasswordSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new AccountActions.changePasswordFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected setPassword: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.SET_PASSWORD)
    .mergeMap((action: LoopbackAction) =>
      this.account.setPassword(action.payload.newPassword)
        .map((response) => new AccountActions.setPasswordSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new AccountActions.setPasswordFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyAccessTokens: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.CREATE_MANY_ACCESSTOKENS)
    .mergeMap((action: LoopbackAction) =>
      this.account.createManyAccessTokens(action.payload.id, action.payload.data)
        .map((response) => new AccountActions.createManyAccessTokensSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.createManyAccessTokensFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyRoles: Observable<LoopbackAction> = this.actions$
    .ofType(AccountActionTypes.CREATE_MANY_ROLES)
    .mergeMap((action: LoopbackAction) =>
      this.account.createManyRoles(action.payload.id, action.payload.data)
        .map((response) => new AccountActions.createManyRolesSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new AccountActions.createManyRolesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

    /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Account specific actions
   */
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
    
    /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Decorate base effects metadata
   */
  @Effect() protected create;
  @Effect() protected createMany;
  @Effect() protected findById;
  @Effect() protected find;
  @Effect() protected findOne;
  @Effect() protected updateAll;
  @Effect() protected deleteById;
  @Effect() protected updateAttributes;
  @Effect() protected upsert;
  @Effect() protected upsertWithWhere;
  @Effect() protected replaceOrCreate;
  @Effect() protected replaceById;
  @Effect() protected patchOrCreate;
  @Effect() protected patchAttributes;

  constructor(
    @Inject(Actions) public actions$: Actions,
    @Inject(AccountApi) public account: AccountApi
  ) {
    super(actions$, account, 'Account', AccountActionTypes, AccountActions);
  }
}
