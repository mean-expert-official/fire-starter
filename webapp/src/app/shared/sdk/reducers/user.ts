import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { User } from '../models/User';
import { UserActionTypes } from '../actions/user';

export interface State {
  ids: string[];
  entities: { [id: string]: User };
  selectedIds: string | string[];
  selectedAppsIds: string | string[];
};

const initialState: State = {
  ids: [],
  entities: {},
  selectedIds: [],
  selectedAppsIds: [],
};

function ReducerFactory() {
  let cases = {};

  /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Apps relation reducer methods
   */
  cases[UserActionTypes.FIND_BY_ID_APPS] =
    (state = initialState, action: Action) => {
      state.entities[action.payload.id].apps =
        Array.from(new Set([...state.entities[action.payload.id].apps, action.payload.data]));

      return Object.assign({}, state, {
        entities: state.entities,
        selectedAppsIds: action.payload.data.id,
      });
    };

  cases[UserActionTypes.DESTROY_BY_ID_APPS] =
    (state = initialState, action: Action) => {
      state.entities[action.payload.id].apps =
        state.entities[action.payload.id].apps.filter((item) => item.id !== action.payload.fk);

      return Object.assign({}, state, { entities: state.entities });
    };

  cases[UserActionTypes.UPDATE_BY_ID_APPS] =
    (state = initialState, action: Action) => {
      state.entities[action.payload.id].apps =
        state.entities[action.payload.id].apps.map((item) => {
          if (item.id === action.payload.data.id) {
            return action.payload.data;
          } else {
            return item;
          }
        });

      return Object.assign({}, state, { entities: state.entities });
    };

  cases[UserActionTypes.CREATE_APPS] =
    (state = initialState, action: Action) => {
      state.entities[action.payload.id].apps =
        Array.from(new Set([...state.entities[action.payload.id].apps, ...action.payload.data]));

      return Object.assign({}, state, { entities: state.entities });
    };

  cases[UserActionTypes.DELETE_APPS] =
    (state = initialState, action: Action) => {
      state.entities[action.payload.id].apps = [];

      return Object.assign({}, state, { entities: state.entities });
    };

  cases[UserActionTypes.CREATE_MANY_APPS] =
    (state = initialState, action: Action) => {
      state.entities[action.payload.id].apps =
        Array.from(new Set([...state.entities[action.payload.id].apps, ...action.payload.data]));

      return Object.assign({}, state, { entities: state.entities });
    };

  return cases;
};

const cases = Object.assign(BaseReducerFactory<State, User>(UserActionTypes), ReducerFactory());

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
