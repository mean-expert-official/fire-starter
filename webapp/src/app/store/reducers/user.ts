import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { Account } from '../../shared/sdk/models';
import { UserActionTypes } from '../actions/user';

export interface State {
  ids: string[];
  entities: { [id: string]: Account };
  selectedIds: string | string[];
};

const initialState: State = {
  ids: [],
  entities: {},
  selectedIds: [],
};

const cases = Object.assign(BaseReducerFactory<State, Account>(UserActionTypes));

export function UsersReducer(state = initialState, action: Action): State {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export function getUsersState() {
  return (state$: Observable<any>) => state$
    .select((s) => s.users);
}

export function getUsersEntities() {
  return (state$: Observable<any>) => state$
    .select((s) => s.users.entities);
}

export function getUsersIds() {
  return (state$: Observable<any>) => state$
    .select((s) => s.users.ids);
}

export function getUsersSelectedIds() {
  return (state$: Observable<any>) => state$
    .select((s) => s.users.selectedIds);
}

export function getUsers() {
  return (state$: Observable<any>) =>
    createSelector(getUsersEntities(), getUsersIds(), (entities: any, ids: any) =>
      ids.map((id: any) => entities[id])
    );
}

export function getUserById(id: string) {
  return (state$: Observable<any>) => state$
    .select((s) => s.users.entities[id]);
}

export function getUsersById(ids: string[]) {
  return (state$: Observable<any>) =>
    createSelector(getUsersEntities(), (entities: any) =>
      ids.map((id) => entities[id])
    );
}

export function getUsersSelected() {
  return (state$: Observable<any>) =>
    createSelector(getUsersEntities(), getUsersSelectedIds(), (entities: any, selectedIds: any) =>
      selectedIds.map((id: any) => entities[id]).map((ents: any) => ents.length > 1 ? ents : ents[0])
    );
}
