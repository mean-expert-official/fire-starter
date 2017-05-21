import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Role, RoleApi, LoopbackAction, LoopbackErrorActions } from '../../../sdk';
import { RoleActions, RoleActionTypes } from '../actions';
import { UiService } from '../../../ui/ui.service';

@Injectable()
export class RoleEffects {

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private roleApi: RoleApi,
    private uiService: UiService,
  ) { }

  @Effect()
  protected createRole: Observable<any> = this.actions$
    .ofType(RoleActionTypes.CREATE_ROLE)
    .mergeMap((action: LoopbackAction) => this.roleApi.create(action.payload)
      .map((response: Role) => new RoleActions.createRoleSuccess(response, action.meta))
      .catch((error: any) => of(new RoleActions.createRoleFail(error, action.meta))));

  @Effect({ dispatch: false })
  protected createRoleSuccess = this.actions$
    .ofType(RoleActionTypes.CREATE_ROLE_SUCCESS)
    .map(action => this.uiService.toastSuccess('Create Role Success', `Role <b><i>${action.payload.name}</i></b> has been created successfully.`));

  @Effect({ dispatch: false })
  protected createRoleFail = this.actions$
    .ofType(RoleActionTypes.CREATE_ROLE_FAIL)
    .map(action => this.uiService.toastError('Create Role Fail', `${action.payload.message}`));

  @Effect()
  protected readRoles: Observable<any> = this.actions$
    .ofType(RoleActionTypes.READ_ROLES)
    .mergeMap((action: LoopbackAction) => this.roleApi.find(action.payload)
      .map((response: Array<Role>) => new RoleActions.readRolesSuccess(response, action.meta))
      .catch((error: any) => of(new RoleActions.readRolesFail(error, action.meta))));

  @Effect()
  protected updateRole: Observable<any> = this.actions$
    .ofType(RoleActionTypes.UPDATE_ROLE)
    .mergeMap((action: LoopbackAction) => this.roleApi.patchAttributes(action.payload.id, action.payload)
      .map((response: Role) => new RoleActions.updateRoleSuccess(action.payload, action.meta))
      .catch((error: any) => of(new RoleActions.updateRoleFail(error, action.meta))));

  @Effect({ dispatch: false })
  protected updateRoleSuccess = this.actions$
    .ofType(RoleActionTypes.UPDATE_ROLE_SUCCESS)
    .map(action => this.uiService.toastSuccess('Update Role Success', `Role <b><i>${action.payload.name}</i></b> has been updated successfully.`));

  @Effect({ dispatch: false })
  protected updateRoleFail = this.actions$
    .ofType(RoleActionTypes.UPDATE_ROLE_FAIL)
    .map(action => this.uiService.toastError('Update Role Fail', `${action.payload.message}`));

  @Effect()
  protected deleteRole: Observable<any> = this.actions$
    .ofType(RoleActionTypes.DELETE_ROLE)
    .mergeMap((action: LoopbackAction) => this.roleApi.deleteById(action.payload.id)
      .map((response: Role) => new RoleActions.deleteRoleSuccess(action.payload, action.meta))
      .catch((error: any) => of(new RoleActions.deleteRoleFail(error, action.meta))));

  @Effect({ dispatch: false })
  protected deleteRoleSuccess = this.actions$
    .ofType(RoleActionTypes.DELETE_ROLE_SUCCESS)
    .map(action => this.uiService.toastSuccess('Delete Role Success', `Role <b><i>${action.payload.name}</i></b> has been deleted successfully.`));

  @Effect({ dispatch: false })
  protected deleteRoleFail = this.actions$
    .ofType(RoleActionTypes.DELETE_ROLE_FAIL)
    .map(action => this.uiService.toastError('Delete Role Fail', `${action.payload.message}`));

}
