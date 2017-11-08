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

import { RoleActionTypes, RoleActions } from '../actions/Role';
import { LoopbackErrorActions } from '../actions/error';
import { RoleApi } from '../services/index';

@Injectable()
export class RoleEffects extends BaseLoopbackEffects {
  @Effect()
  protected findByIdPrincipals: Observable<LoopbackAction> = this.actions$
    .ofType(RoleActionTypes.FIND_BY_ID_PRINCIPALS)
    .mergeMap((action: LoopbackAction) =>
      this.role.findByIdPrincipals(action.payload.id, action.payload.fk)
        .map((response) => new RoleActions.findByIdPrincipalsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoleActions.findByIdPrincipalsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyByIdPrincipals: Observable<LoopbackAction> = this.actions$
    .ofType(RoleActionTypes.DESTROY_BY_ID_PRINCIPALS)
    .mergeMap((action: LoopbackAction) =>
      this.role.destroyByIdPrincipals(action.payload.id, action.payload.fk)
        .map((response) => new RoleActions.destroyByIdPrincipalsSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new RoleActions.destroyByIdPrincipalsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected updateByIdPrincipals: Observable<LoopbackAction> = this.actions$
    .ofType(RoleActionTypes.UPDATE_BY_ID_PRINCIPALS)
    .mergeMap((action: LoopbackAction) =>
      this.role.updateByIdPrincipals(action.payload.id, action.payload.fk, action.payload.data)
        .map((response) => new RoleActions.updateByIdPrincipalsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoleActions.updateByIdPrincipalsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getPrincipals: Observable<LoopbackAction> = this.actions$
    .ofType(RoleActionTypes.GET_PRINCIPALS)
    .mergeMap((action: LoopbackAction) =>
      this.role.getPrincipals(action.payload.id, action.payload.filter)
        .map((response) => new RoleActions.getPrincipalsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoleActions.getPrincipalsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createPrincipals: Observable<LoopbackAction> = this.actions$
    .ofType(RoleActionTypes.CREATE_PRINCIPALS)
    .mergeMap((action: LoopbackAction) =>
      this.role.createPrincipals(action.payload.id, action.payload.data)
        .map((response) => new RoleActions.createPrincipalsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoleActions.createPrincipalsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected deletePrincipals: Observable<LoopbackAction> = this.actions$
    .ofType(RoleActionTypes.DELETE_PRINCIPALS)
    .mergeMap((action: LoopbackAction) =>
      this.role.deletePrincipals(action.payload.id)
        .map((response) => new RoleActions.deletePrincipalsSuccess(action.payload, action.meta))
        .catch((error) => concat(
          of(new RoleActions.deletePrincipalsFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createManyPrincipals: Observable<LoopbackAction> = this.actions$
    .ofType(RoleActionTypes.CREATE_MANY_PRINCIPALS)
    .mergeMap((action: LoopbackAction) =>
      this.role.createManyPrincipals(action.payload.id, action.payload.data)
        .map((response) => new RoleActions.createManyPrincipalsSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new RoleActions.createManyPrincipalsFail(error, action.meta)),
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
    @Inject(RoleApi) public role: RoleApi
  ) {
    super(actions$, role, 'Role', RoleActionTypes, RoleActions);
  }
}
