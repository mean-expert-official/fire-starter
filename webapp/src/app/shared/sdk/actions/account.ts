/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { SDKToken, Account } from '../models';

export const AccountActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Account'), {
  /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Apps relation action types
   */
  FIND_BY_ID_APPS: type('[Account] FindByIdApps account'),
  FIND_BY_ID_APPS_SUCCESS: type('[Account] FindByIdApps account success'),
  FIND_BY_ID_APPS_FAIL: type('[Account] FindByIdApps account fail'),

  DESTROY_BY_ID_APPS: type('[Account] DestroyByIdApps account'),
  DESTROY_BY_ID_APPS_SUCCESS: type('[Account] DestroyByIdApps account success'),
  DESTROY_BY_ID_APPS_FAIL: type('[Account] DestroyByIdApps account fail'),

  UPDATE_BY_ID_APPS: type('[Account] UpdateByIdApps account'),
  UPDATE_BY_ID_APPS_SUCCESS: type('[Account] UpdateByIdApps account success'),
  UPDATE_BY_ID_APPS_FAIL: type('[Account] UpdateByIdApps account fail'),

  CREATE_APPS: type('[Account] CreateApps account'),
  CREATE_APPS_SUCCESS: type('[Account] CreateApps account success'),
  CREATE_APPS_FAIL: type('[Account] CreateApps account fail'),

  DELETE_APPS: type('[Account] DeleteApps account'),
  DELETE_APPS_SUCCESS: type('[Account] DeleteApps account success'),
  DELETE_APPS_FAIL: type('[Account] DeleteApps account fail'),

  CREATE_MANY_APPS: type('[Account] CreateManyApps account'),
  CREATE_MANY_APPS_SUCCESS: type('[Account] CreateManyApps account success'),
  CREATE_MANY_APPS_FAIL: type('[Account] CreateManyApps account fail'),
}, {
  /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Account specific action types
   */
  LOGIN: type('[Account] Login account'),
  LOGIN_SUCCESS: type('[Account] Login account success'),
  LOGIN_FAIL: type('[Account] Login account fail'),

  REGISTER: type('[Account] Register account'),
  REGISTER_SUCCESS: type('[Account] Register account success'),
  REGISTER_FAIL: type('[Account] Register account fail'),

  LOGOUT: type('[Account] Logout account'),
  LOGOUT_SUCCESS: type('[Account] Logout account success'),
  LOGOUT_FAIL: type('[Account] Logout account fail'),
});

export const AccountActions =
Object.assign(BaseLoopbackActionsFactory<Account>('Account', AccountActionTypes), {
  /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Apps relation actions
   */
  findByIdApps: class implements Action {
    public readonly type = AccountActionTypes.FIND_BY_ID_APPS;
    public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },

  findByIdAppsSuccess: class implements Action {
    public readonly type = AccountActionTypes.FIND_BY_ID_APPS_SUCCESS;
    public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },

  findByIdAppsFail: class implements Action {
    public readonly type = AccountActionTypes.FIND_BY_ID_APPS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  destroyByIdApps: class implements Action {
    public readonly type = AccountActionTypes.DESTROY_BY_ID_APPS;
    public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },

  destroyByIdAppsSuccess: class implements Action {
    public readonly type = AccountActionTypes.DESTROY_BY_ID_APPS_SUCCESS;
    public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },

  destroyByIdAppsFail: class implements Action {
    public readonly type = AccountActionTypes.DESTROY_BY_ID_APPS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  updateByIdApps: class implements Action {
    public readonly type = AccountActionTypes.UPDATE_BY_ID_APPS;
    public payload: {id: any, fk: any, data: any};

    constructor(id: any, fk: any, data: any, public meta?: any) {
      this.payload = {id, fk, data};
    }
  },

  updateByIdAppsSuccess: class implements Action {
    public readonly type = AccountActionTypes.UPDATE_BY_ID_APPS_SUCCESS;
    public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },

  updateByIdAppsFail: class implements Action {
    public readonly type = AccountActionTypes.UPDATE_BY_ID_APPS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  createApps: class implements Action {
    public readonly type = AccountActionTypes.CREATE_APPS;
    public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },

  createAppsSuccess: class implements Action {
    public readonly type = AccountActionTypes.CREATE_APPS_SUCCESS;
    public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },

  createAppsFail: class implements Action {
    public readonly type = AccountActionTypes.CREATE_APPS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  deleteApps: class implements Action {
    public readonly type = AccountActionTypes.DELETE_APPS;

    constructor(public payload: any, public meta?: any) { }
  },

  deleteAppsSuccess: class implements Action {
    public readonly type = AccountActionTypes.DELETE_APPS_SUCCESS;

    constructor(public payload: any, public meta?: any) { }
  },

  deleteAppsFail: class implements Action {
    public readonly type = AccountActionTypes.DELETE_APPS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  createManyApps: class implements Action {
    public readonly type = AccountActionTypes.CREATE_MANY_APPS;
    public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },

  createManyAppsSuccess: class implements Action {
    public readonly type = AccountActionTypes.CREATE_MANY_APPS_SUCCESS;
    public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },

  createManyAppsFail: class implements Action {
    public readonly type = AccountActionTypes.CREATE_MANY_APPS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
}, {
  /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Account specific actions
   */
  login: class implements Action {
    public readonly type = AccountActionTypes.LOGIN;
    public payload: {credentials: any, include: any, rememberMe: boolean};

    constructor(
      credentials: any,
      include: any = 'account',
      rememberMe: boolean = true,
      public meta?: any) {
      this.payload = {credentials, include, rememberMe};
    }
  },

  loginSuccess: class implements Action {
    public readonly type = AccountActionTypes.LOGIN_SUCCESS;

    constructor(public payload: SDKToken, public meta?: any) { }
  },

  loginFail: class implements Action {
    public readonly type = AccountActionTypes.LOGIN_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  signup: class implements Action {
    public readonly type = AccountActionTypes.SIGNUP;

    constructor(public payload: any, public meta?: any) { }
  },

  signupSuccess: class implements Action {
    public readonly type = AccountActionTypes.SIGNUP_SUCCESS;
    public payload: {credentials: any, data: any};

    constructor(credentials: any, data: any, public meta?: any) {
      this.payload = {credentials, data};
    }
  },

  signupFail: class implements Action {
    public readonly type = AccountActionTypes.SIGNUP_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  logout: class implements Action  {
    public readonly type = AccountActionTypes.LOGOUT;
  },

  logoutSuccess: class implements Action  {
    public readonly type = AccountActionTypes.LOGOUT_SUCCESS;
  },

  logoutFail: class implements Action  {
    public readonly type = AccountActionTypes.LOGOUT_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});
