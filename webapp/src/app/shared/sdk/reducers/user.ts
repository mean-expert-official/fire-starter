import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { Account } from '../models/Account';
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

/**
 * @module UsersReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible User reducer.
 */
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

/**
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @description
 * Apps relation helper methods
 */
export function getUsersSelectedAppsIds() {
  return (state$: Observable<any>) => state$
    .select((s) => s.users.selectedAppsIds);
}

export function getUsersApps(id: string) {
  return (state$: Observable<any>) => state$
    .select((s) => s.users.entities[id].apps);
}

export function getUsersSelectedApps(id: string) {
  return (state$: Observable<any>) =>
    createSelector(getUsersApps(id), getUsersSelectedAppsIds(), (apps: any, selectedAppsIds: any) =>
      selectedAppsIds.map((appId: any) => apps[appId]).map((ents: any) =>
        ents.length > 1 ? ents : ents[0])
    );
}
