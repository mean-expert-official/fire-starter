/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseActionTypesFactory, BaseActionsFactory } from './base';
import { SDKToken, Account } from '../../shared/sdk/models';

export const UserActionTypes =
  Object.assign(BaseActionTypesFactory('Account'), {

    LOGIN: type('[User] Login User'),
    LOGIN_SUCCESS: type('[User] Login User Success'),
    LOGIN_FAIL: type('[User] Login User Fail'),

    REGISTER: type('[User] Register User'),
    REGISTER_SUCCESS: type('[User] Register User Success'),
    REGISTER_FAIL: type('[User] Register User Fail'),

    LOGOUT: type('[User] Logout User'),
    LOGOUT_SUCCESS: type('[User] Logout User Success'),
    LOGOUT_FAIL: type('[User] Logout User Fail'),
  });

export const UserActions =
  Object.assign(BaseActionsFactory<Account>('User', UserActionTypes), {

    login: class implements Action {
      public readonly type = UserActionTypes.LOGIN;

      constructor(public payload: any) { }
    },

    loginSuccess: class implements Action {
      public readonly type = UserActionTypes.LOGIN_SUCCESS;

      constructor(public payload: SDKToken) { }
    },

    loginFail: class implements Action {
      public readonly type = UserActionTypes.LOGIN_FAIL;

      constructor(public payload: any) { }
    },

    register: class implements Action {
      public readonly type = UserActionTypes.REGISTER;

      constructor(public payload: any) { }
    },

    registerSuccess: class implements Action {
      public readonly type = UserActionTypes.REGISTER_SUCCESS;

      constructor(public payload: SDKToken) { }
    },

    registerFail: class implements Action {
      public readonly type = UserActionTypes.REGISTER_FAIL;

      constructor(public payload: any) { }
    },

    logout: class implements Action {
      public readonly type = UserActionTypes.LOGOUT;
    },

    logoutSuccess: class implements Action {
      public readonly type = UserActionTypes.LOGOUT_SUCCESS;
    },

    logoutFail: class implements Action {
      public readonly type = UserActionTypes.LOGOUT_FAIL;

      constructor(public payload: any) { }
    },
  });
