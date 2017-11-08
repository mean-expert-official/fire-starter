import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { createSelector } from 'reselect';
import { Account, Role, RoleMapping, ACL } from '../../../sdk';
import { UserActionTypes, RoleActionTypes, ControlActionTypes } from '../actions';
import * as Users from './user.reducers';
import * as Roles from './role.reducers';
import * as Controls from './control.reducers';

export interface State {
  users: Users.State;
  roles: Roles.State;
  controls: Controls.State;
}

const reducers = {
  users: Users.UserReducer,
  roles: Roles.RoleReducer,
  controls: Controls.ControlReducer,
}

export const AdminReducer: ActionReducer<State> = combineReducers(reducers);

export function FireAdminReducer(state: any, action: any) {
  return AdminReducer(state, action);
}

export const getUserState = state => state.users;
export const getUserEntities = state => state.users.entities;
export const getUserIds = state => state.users.ids;
export const getSelectedUserIds = state => state.users.selectedIds;
export const getSelectedUsers = createSelector(getUserEntities, getSelectedUserIds, (entities, selectedIds) => {
  return selectedIds.map(id => entities[id]);
});
