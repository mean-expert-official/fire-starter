import { Action } from '@ngrx/store';
import { type } from '../../../sdk/util';
import { Account, Role, ACL, LoopBackFilter } from '../../../sdk';

export const UserActionTypes = {

  CREATE_USER: type('[Admin] createUser'),
  CREATE_USER_SUCCESS: type('[Admin] createUser success'),
  CREATE_USER_FAIL: type('[Admin] createUser fail'),

  READ_USERS: type('[Admin] readUsers'),
  READ_USERS_SUCCESS: type('[Admin] readUsers success'),
  READ_USERS_FAIL: type('[Admin] readUsers fail'),

  UPDATE_USER: type('[Admin] updateUser'),
  UPDATE_USER_SUCCESS: type('[Admin] updateUser success'),
  UPDATE_USER_FAIL: type('[Admin] updateUser fail'),

  DELETE_USER: type('[Admin] deleteUser'),
  DELETE_USER_SUCCESS: type('[Admin] deleteUser success'),
  DELETE_USER_FAIL: type('[Admin] deleteUser fail'),

  ADD_USER_TO_ROLE: type('[Admin] addUserToRole'),
  ADD_USER_TO_ROLE_SUCCESS: type('[Admin] addUserToRole success'),
  ADD_USER_TO_ROLE_FAIL: type('[Admin] addUserToRole fail'),

  DELETE_USER_FROM_ROLE: type('[Admin] deleteUserFromRole'),
  DELETE_USER_FROM_ROLE_SUCCESS: type('[Admin] deleteUserFromRole success'),
  DELETE_USER_FROM_ROLE_FAIL: type('[Admin] deleteUserFromRole fail'),

}

export const UserActions = {

  createUser: class implements Action {
    public readonly type = UserActionTypes.CREATE_USER;
    constructor(public payload: Account, public meta?: any) { }
  },

  createUserSuccess: class implements Action {
    public readonly type = UserActionTypes.CREATE_USER_SUCCESS;
    constructor(public payload: Account, public meta?: any) { }
  },

  createUserFail: class implements Action {
    public readonly type = UserActionTypes.CREATE_USER_FAIL;
    constructor(public payload: any, public meta?: any) { }
  },

  readUsers: class implements Action {
    public readonly type = UserActionTypes.READ_USERS;
    constructor(public payload: LoopBackFilter = {}, public meta?: any) { }
  },

  readUsersSuccess: class implements Action {
    public readonly type = UserActionTypes.READ_USERS_SUCCESS;
    constructor(public payload: Account[], public meta?: any) { }
  },

  readUsersFail: class implements Action {
    public readonly type = UserActionTypes.READ_USERS_FAIL;
    constructor(public payload: any, public meta?: any) { }
  },

  updateUser: class implements Action {
    public readonly type = UserActionTypes.UPDATE_USER;
    constructor(public payload: Account, public meta?: any) { }
  },

  updateUserSuccess: class implements Action {
    public readonly type = UserActionTypes.UPDATE_USER_SUCCESS;
    constructor(public payload: Account, public meta?: any) { }
  },

  updateUserFail: class implements Action {
    public readonly type = UserActionTypes.UPDATE_USER_FAIL;
    constructor(public payload: any, public meta?: any) { }
  },

  deleteUser: class implements Action {
    public readonly type = UserActionTypes.DELETE_USER;
    constructor(public payload: any, public meta?: any) { }
  },

  deleteUserSuccess: class implements Action {
    public readonly type = UserActionTypes.DELETE_USER_SUCCESS;
    constructor(public payload: any, public meta?: any) { }
  },

  deleteUserFail: class implements Action {
    public readonly type = UserActionTypes.DELETE_USER_FAIL;
    constructor(public payload: any, public meta?: any) { }
  },

  addUserToRole: class implements Action {
    public readonly type = UserActionTypes.ADD_USER_TO_ROLE;
    constructor(public payload: any, public meta?: any) { }
  },

  addUserToRoleSuccess: class implements Action {
    public readonly type = UserActionTypes.ADD_USER_TO_ROLE_SUCCESS;
    constructor(public payload: any, public meta?: any) { }
  },

  addUserToRoleFail: class implements Action {
    public readonly type = UserActionTypes.ADD_USER_TO_ROLE_FAIL;
    constructor(public payload: any, public meta?: any) { }
  },

  deleteUserFromRole: class implements Action {
    public readonly type = UserActionTypes.DELETE_USER_FROM_ROLE;
    constructor(public payload: any, public meta?: any) { }
  },

  deleteUserFromRoleSuccess: class implements Action {
    public readonly type = UserActionTypes.DELETE_USER_FROM_ROLE_SUCCESS;
    constructor(public payload: any, public meta?: any) { }
  },

  deleteUserFromRoleFail: class implements Action {
    public readonly type = UserActionTypes.DELETE_USER_FROM_ROLE_FAIL;
    constructor(public payload: any, public meta?: any) { }
  },

}
