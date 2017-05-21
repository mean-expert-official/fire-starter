/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, ACL } from '../models';

export const ACLActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('ACL'), {
});
export const ACLActions =
Object.assign(BaseLoopbackActionsFactory<ACL>('ACL', ACLActionTypes), {
});