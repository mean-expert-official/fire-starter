import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Account, Role, AccountApi, RoleApi, LoopbackAction, LoopbackErrorActions } from '../../../sdk';
import { UserActions, UserActionTypes, RoleActions } from '../actions';
import { UiService } from '../../../ui/ui.service';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private userApi: AccountApi,
    private roleApi: RoleApi,
    private uiService: UiService,
  ) { }

  @Effect()
  protected createUser: Observable<any> = this.actions$
    .ofType(UserActionTypes.CREATE_USER)
    .mergeMap((action: LoopbackAction) => this.userApi.create(action.payload)
      .map((response: Account) => new UserActions.createUserSuccess(response, action.meta))
      .catch((error: any) => of(new UserActions.createUserFail(error, action.meta))));

  @Effect({ dispatch: false })
  protected createUserSuccess = this.actions$
    .ofType(UserActionTypes.CREATE_USER_SUCCESS)
    .map(action => this.uiService.toastSuccess('Create User Success', `User <b><i>${action.payload.email}</i></b> has been created successfully.`));

  @Effect({ dispatch: false })
  protected createUserFail = this.actions$
    .ofType(UserActionTypes.CREATE_USER_FAIL)
    .map(action => this.uiService.toastError('Create User Fail', `${action.payload.message}`));

  @Effect()
  protected readUsers: Observable<any> = this.actions$
    .ofType(UserActionTypes.READ_USERS)
    .mergeMap((action: LoopbackAction) => this.userApi.find(action.payload)
      .map((response: Array<Account>) => new UserActions.readUsersSuccess(response, action.meta))
      .catch((error: any) => of(new UserActions.readUsersFail(error, action.meta))));

  @Effect()
  protected updateUser: Observable<any> = this.actions$
    .ofType(UserActionTypes.UPDATE_USER)
    .mergeMap((action: LoopbackAction) => this.userApi.patchAttributes(action.payload.id, action.payload)
      .map((response: Account) => new UserActions.updateUserSuccess(action.payload, action.meta))
      .catch((error: any) => of(new UserActions.updateUserFail(error, action.meta))));

  @Effect({ dispatch: false })
  protected updateUserSuccess = this.actions$
    .ofType(UserActionTypes.UPDATE_USER_SUCCESS)
    .map(action => this.uiService.toastSuccess('Update User Success', `User <b><i>${action.payload.email}</i></b> has been updated successfully.`));

  @Effect({ dispatch: false })
  protected updateUserFail = this.actions$
    .ofType(UserActionTypes.UPDATE_USER_FAIL)
    .map(action => this.uiService.toastError('Update User Fail', `${action.payload.message}`));

  @Effect()
  protected deleteUser: Observable<any> = this.actions$
    .ofType(UserActionTypes.DELETE_USER)
    .mergeMap((action: LoopbackAction) => this.userApi.deleteById(action.payload.id)
      .map((response: Account) => new UserActions.deleteUserSuccess(action.payload, action.meta))
      .catch((error: any) => of(new UserActions.deleteUserFail(error, action.meta))));

  @Effect({ dispatch: false })
  protected deleteUserSuccess = this.actions$
    .ofType(UserActionTypes.DELETE_USER_SUCCESS)
    .map(action => this.uiService.toastSuccess('Delete User Success', `User <b><i>${action.payload.email}</i></b> has been deleted successfully.`));

  @Effect({ dispatch: false })
  protected deleteUserFail = this.actions$
    .ofType(UserActionTypes.DELETE_USER_FAIL)
    .map(action => this.uiService.toastError('Delete User Fail', `${action.payload.message}`));

  @Effect()
  protected addUserToRole: Observable<any> = this.actions$
    .ofType(UserActionTypes.ADD_USER_TO_ROLE)
    .mergeMap((action: LoopbackAction) => this.roleApi.createPrincipals(action.payload.role.id, action.payload.principal)
      .map((response: any) => new UserActions.addUserToRoleSuccess({ user: action.payload.user, role: action.payload.role, mapping: response }, action.meta))
      .catch((error: any) => of(new UserActions.addUserToRoleFail(error, action.meta))));

  @Effect({ dispatch: false })
  protected addUserToRoleSuccess = this.actions$
    .ofType(UserActionTypes.ADD_USER_TO_ROLE_SUCCESS)
    .map(action => this.uiService.toastSuccess('Role Added', `User <b><i>${action.payload.user.email}</i></b> has been successfully added to the <b><i>${action.payload.role.name}</i></b> role.`));

  @Effect({ dispatch: false })
  protected addUserToRoleFail = this.actions$
    .ofType(UserActionTypes.ADD_USER_TO_ROLE_FAIL)
    .map(action => this.uiService.toastError('Add Role Fail', `${action.payload.message}`));

  @Effect()
  protected deleteUserFromRole: Observable<any> = this.actions$
    .ofType(UserActionTypes.DELETE_USER_FROM_ROLE)
    .mergeMap((action: LoopbackAction) => this.roleApi.destroyByIdPrincipals(action.payload.role.id, action.payload.mappingId)
      .map((response: Account) => new UserActions.deleteUserFromRoleSuccess(action.payload, action.meta))
      .catch((error: any) => of(new UserActions.deleteUserFromRoleFail(error, action.meta))));

  @Effect({ dispatch: false })
  protected deleteUserFromRoleSuccess = this.actions$
    .ofType(UserActionTypes.DELETE_USER_FROM_ROLE_SUCCESS)
    .map(action => this.uiService.toastSuccess('Role Removed', `User <b><i>${action.payload.user.email}</i></b> has been successfully removed from the <b><i>${action.payload.role.name}</i></b> role.`));

  @Effect({ dispatch: false })
  protected deleteUserFromRoleFail = this.actions$
    .ofType(UserActionTypes.DELETE_USER_FROM_ROLE_FAIL)
    .map(action => this.uiService.toastError('Remove Role Fail', `${action.payload.message}`));
}
