import { Action } from '@ngrx/store';
import { type } from '../../../sdk/util';
import { Role, LoopBackFilter } from '../../../sdk';

export const RoleActionTypes = {

  CREATE_ROLE: type('[Admin] createRole'),
  CREATE_ROLE_SUCCESS: type('[Admin] createRole success'),
  CREATE_ROLE_FAIL: type('[Admin] createRole fail'),

  READ_ROLES: type('[Admin] readRoles'),
  READ_ROLES_SUCCESS: type('[Admin] readRoles success'),
  READ_ROLES_FAIL: type('[Admin] readRoles fail'),

  UPDATE_ROLE: type('[Admin] updateRole'),
  UPDATE_ROLE_SUCCESS: type('[Admin] updateRole success'),
  UPDATE_ROLE_FAIL: type('[Admin] updateRole fail'),

  DELETE_ROLE: type('[Admin] deleteRole'),
  DELETE_ROLE_SUCCESS: type('[Admin] deleteRole success'),
  DELETE_ROLE_FAIL: type('[Admin] deleteRole fail'),

};

export const RoleActions = {

  createRole: class implements Action {
    public readonly type = RoleActionTypes.CREATE_ROLE;
    constructor(public payload: Role, public meta?: any) { }
  },

  createRoleSuccess: class implements Action {
    public readonly type = RoleActionTypes.CREATE_ROLE_SUCCESS;
    constructor(public payload: Role, public meta?: any) { }
  },

  createRoleFail: class implements Action {
    public readonly type = RoleActionTypes.CREATE_ROLE_FAIL;
    constructor(public payload: any, public meta?: any) { }
  },

  readRoles: class implements Action {
    public readonly type = RoleActionTypes.READ_ROLES;
    constructor(public payload: LoopBackFilter = {}, public meta?: any) { }
  },

  readRolesSuccess: class implements Action {
    public readonly type = RoleActionTypes.READ_ROLES_SUCCESS;
    constructor(public payload: Role[], public meta?: any) { }
  },

  readRolesFail: class implements Action {
    public readonly type = RoleActionTypes.READ_ROLES_FAIL;
    constructor(public payload: any, public meta?: any) { }
  },

  updateRole: class implements Action {
    public readonly type = RoleActionTypes.UPDATE_ROLE;
    constructor(public payload: Role, public meta?: any) { }
  },

  updateRoleSuccess: class implements Action {
    public readonly type = RoleActionTypes.UPDATE_ROLE_SUCCESS;
    constructor(public payload: Role, public meta?: any) { }
  },

  updateRoleFail: class implements Action {
    public readonly type = RoleActionTypes.UPDATE_ROLE_FAIL;
    constructor(public payload: any, public meta?: any) { }
  },

  deleteRole: class implements Action {
    public readonly type = RoleActionTypes.DELETE_ROLE;
    constructor(public payload: any, public meta?: any) { }
  },

  deleteRoleSuccess: class implements Action {
    public readonly type = RoleActionTypes.DELETE_ROLE_SUCCESS;
    constructor(public payload: any, public meta?: any) { }
  },

  deleteRoleFail: class implements Action {
    public readonly type = RoleActionTypes.DELETE_ROLE_FAIL;
    constructor(public payload: any, public meta?: any) { }
  },

};
