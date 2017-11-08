/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Note } from '../models';

export const NoteActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Note'), {
});
export const NoteActions =
Object.assign(BaseLoopbackActionsFactory<Note>('Note', NoteActionTypes), {
});