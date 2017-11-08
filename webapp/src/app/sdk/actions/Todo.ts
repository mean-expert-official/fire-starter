/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Todo } from '../models';

export const TodoActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Todo'), {
});
export const TodoActions =
Object.assign(BaseLoopbackActionsFactory<Todo>('Todo', TodoActionTypes), {
});