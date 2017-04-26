/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { SDKToken } from '../../shared/sdk/models';

export const AuthActionTypes = {
  LOAD_TOKEN: type('[Auth] Load token from storage into store'),
  LOAD_TOKEN_SUCCESS: type('[Auth] Load token from storage into store success'),
  LOAD_TOKEN_FAIL: type('[Auth] Load token from storage into store fail'),
  SET_TOKEN: type('[Auth] Set token in store'),
  SET_TOKEN_SUCCESS: type('[Auth] Set token in store success'),
  CLEAR_TOKEN: type('[Auth] Clear token in store'),
  SET_USER: type('[Auth] Set user in store'),
  SET_USER_SUCCESS: type('[Auth] Set user in store success'),
  UPDATE_USER_PROPERTIES: type('[Auth] Update user properties in store'),
  UPDATE_USER_PROPERTIES_SUCCESS: type('[Auth] Update user properties in store success'),
};

export const AuthActions = {
  loadToken: class implements Action {
    public type = AuthActionTypes.LOAD_TOKEN;
  },

  loadTokenSuccess: class implements Action {
    public type = AuthActionTypes.LOAD_TOKEN_SUCCESS;

    constructor(public payload: SDKToken) { }
  },

  loadTokenFail: class implements Action {
    public type = AuthActionTypes.LOAD_TOKEN_FAIL;

    constructor(public payload: any) { }
  },

  setToken: class implements Action {
    public type = AuthActionTypes.SET_TOKEN;

    constructor(public payload: SDKToken) { }
  },

  setTokenSuccess: class implements Action {
    public type = AuthActionTypes.SET_TOKEN_SUCCESS;

    constructor(public payload: SDKToken) { }
  },

  clearToken: class implements Action {
    public type = AuthActionTypes.CLEAR_TOKEN;
  },

  setUser: class implements Action {
    public type = AuthActionTypes.SET_USER;

    constructor(public payload: any) { }
  },

  setUserSuccess: class implements Action {
    public type = AuthActionTypes.SET_USER_SUCCESS;

    constructor(public payload: any) { }
  },

  updateUserProperties: class implements Action {
    public type = AuthActionTypes.UPDATE_USER_PROPERTIES;

    constructor(public payload: any) { }
  },

  updateUserPropertiesSuccess: class implements Action {
    public type = AuthActionTypes.UPDATE_USER_PROPERTIES_SUCCESS;

    constructor(public payload: any) { }
  },
};
