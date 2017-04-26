/* tslint:disable */
import { AuthActionTypes, AuthActions } from './auth';
import { ErrorActionTypes, ErrorActions } from './error';
import { UserActionTypes, UserActions } from './user';

export {
AuthActionTypes, AuthActions,
ErrorActionTypes, ErrorActions,
UserActionTypes, UserActions,
};

export const ACTIONS: any[] = [
  AuthActions,
  ErrorActions,
  UserActions,
];
