/* tslint:disable */
import { LoopbackAuthActionTypes, LoopbackAuthActions } from './auth';
import { LoopbackErrorActionTypes, LoopbackErrorActions } from './error';
import { AccountActionTypes, AccountActions } from './account';

export {
  LoopbackAuthActionTypes, LoopbackAuthActions,
  LoopbackErrorActionTypes, LoopbackErrorActions,
  AccountActionTypes, AccountActions,
};

export const LOOPBACK_ACTIONS: any[] = [
  LoopbackAuthActions,
  LoopbackErrorActions,
  AccountActions,
];
