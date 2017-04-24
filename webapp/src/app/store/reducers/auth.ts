/* tslint:disable */
import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { SDKToken, Account } from '../../shared/sdk/models';
import { AuthActionTypes } from '../actions/auth';
import { UserActionTypes } from '../actions/user';

const initialState: SDKToken = {
  id: null,
  user: null,
  userId: null,
  issuedAt: null,
  created: null,
  ttl: null,
  rememberMe: null
};

export function AuthReducer(state = initialState, action: Action): SDKToken {
  switch (action.type) {
    case UserActionTypes.LOGIN_SUCCESS:
    case AuthActionTypes.SET_TOKEN:
    case AuthActionTypes.LOAD_TOKEN_SUCCESS: {
      const token: SDKToken = action.payload;

      return Object.assign({}, token);
    }

    case AuthActionTypes.SET_USER: {
      const user: any = action.payload;
      let updateState = Object.assign({}, state);

      updateState.user = user;
      updateState.userId = user.id;

      return updateState;
    }

    case UserActionTypes.LOGOUT_SUCCESS:
    case UserActionTypes.LOGOUT_FAIL: {
      return Object.assign({}, initialState);
    }

    case AuthActionTypes.UPDATE_USER_PROPERTIES_SUCCESS: {
      const userProperties: any = action.payload;
      let updateState = Object.assign({}, state);

      updateState.user = Object.assign(updateState.user, userProperties);

      return updateState;
    }

    default: {
      return state;
    }
  }
}

export function getAuthState() {
  return (state$: Observable<any>) => state$
    .select((s) => s.loopbackAuth);
}

export function getAuthToken() {
  return (state$: Observable<any>) => state$
    .select((s) => s.loopbackAuth.id);
}

export function getAuthUser() {
  return (state$: Observable<any>) => state$
    .select((s) => s.loopbackAuth.user);
}

export function getAuthUserId() {
  return (state$: Observable<any>) => state$
    .select((s) => s.loopbackAuth.userId);
}
