import { Observable } from 'rxjs/Observable';
import { Account, Role, RoleMapping, ACL } from '../../../sdk';
import { UserActions, UserActionTypes } from '../actions';
import { createSelector } from 'reselect';

export interface State {
  ids: string[];
  entities: { [id: string]: Account };
  selectedIds: string[];
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedIds: []
}

export function UserReducer(state: State = initialState, action: any): State {
  switch (action.type) {
    case UserActionTypes.CREATE_USER_SUCCESS: {
      const user: Account = action.payload;
      let updateState = Object.assign({}, state);
      updateState.ids = [...state.ids, user.id];
      updateState.entities[user.id] = user;
      return updateState;
    }
    case UserActionTypes.READ_USERS_SUCCESS: {
      const users: Account[] = action.payload;
      const newUsers = users.filter(user => !state.entities[user.id]);
      const newUserIds = newUsers.map(user => user.id);
      const newUserEntities = newUsers.reduce((entities: { [id: string]: Account }, user: Account) => {
        return Object.assign(entities, {
          [user.id]: user
        });
      }, {});
      let updateState = Object.assign({}, state);
      updateState.ids = [...state.ids, ...newUserIds];
      updateState.entities = Object.assign({}, state.entities, newUserEntities);
      updateState.selectedIds = updateState.ids;
      return updateState;
    }
    case UserActionTypes.UPDATE_USER_SUCCESS: {
      const user: Account = action.payload;
      let updateState = Object.assign({}, state);
      updateState.entities[user.id] = user;
      return updateState;
    }
    case UserActionTypes.DELETE_USER_SUCCESS: {
      const user: Account = action.payload;
      let updateState = Object.assign({}, state);
      updateState.ids = state.ids.filter(i => i !== user.id);
      delete updateState.entities[user.id];
      return updateState;
    }
    case UserActionTypes.ADD_USER_TO_ROLE_SUCCESS: {
      const role: Role = action.payload.role;
      let updateState = Object.assign({}, state);
      const user = updateState.entities[action.payload.user.id];
      const userRoles: Role[] = user.roles || [];
      updateState.entities[user.id].roles = [...userRoles, role];
      return updateState;
    }
    case UserActionTypes.DELETE_USER_FROM_ROLE_SUCCESS: {
      const user: Account = action.payload.user;
      const userRoles: Role[] = user.roles || [];
      const role: Role = action.payload.role;
      let updateState = Object.assign({}, state);
      updateState.entities[user.id].roles = userRoles.filter(r => r.id !== role.id);
      return updateState;
    }
    default: {
      return state;
    }
  }
}
