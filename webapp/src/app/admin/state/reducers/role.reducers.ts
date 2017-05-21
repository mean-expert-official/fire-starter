import { Observable } from 'rxjs/Observable';
import { Role, RoleMapping, ACL } from '../../../sdk';
import { RoleActions, RoleActionTypes, UserActionTypes } from '../actions';
import { createSelector } from 'reselect';

export interface State {
  ids: string[];
  entities: { [id: string]: Role };
  selectedIds: string[];
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedIds: []
}

export function RoleReducer(state: State = initialState, action: any): State {
  switch (action.type) {
    case RoleActionTypes.CREATE_ROLE_SUCCESS: {
      const role: Role = action.payload;
      let updateState = Object.assign({}, state);
      updateState.ids = [...state.ids, role.id.toString()];
      updateState.entities[role.id.toString()] = role;
      return updateState;
    }
    case RoleActionTypes.READ_ROLES_SUCCESS: {
      const roles: Role[] = action.payload;
      const newRoles = roles.filter(role => !state.entities[role.id.toString()]);
      const newRoleIds = newRoles.map(role => role.id.toString());
      const newRoleEntities = newRoles.reduce((entities: { [id: string]: Role }, role: Role) => {
        return Object.assign(entities, {
          [role.id.toString()]: role
        });
      }, {});
      let updateState = Object.assign({}, state);
      updateState.ids = [...state.ids, ...newRoleIds];
      updateState.entities = Object.assign({}, state.entities, newRoleEntities);
      updateState.selectedIds = updateState.ids;
      return updateState;
    }
    case RoleActionTypes.UPDATE_ROLE_SUCCESS: {
      const role: Role = action.payload;
      let updateState = Object.assign({}, state);
      updateState.entities[role.id.toString()] = role;
      return updateState;
    }
    case RoleActionTypes.DELETE_ROLE_SUCCESS: {
      const role: Role = action.payload;
      let updateState = Object.assign({}, state);
      updateState.ids = state.ids.filter(i => i !== role.id.toString());
      delete updateState.entities[role.id.toString()];
      return updateState;
    }
    case UserActionTypes.ADD_USER_TO_ROLE_SUCCESS: {
      let updateState = Object.assign({}, state);
      const role: Role = updateState.entities[action.payload.role.id];
      const rolePrincipals = role.principals;
      updateState.entities[role.id].principals = [...rolePrincipals, action.payload.mapping];
      return updateState;
    }
    case UserActionTypes.DELETE_USER_FROM_ROLE_SUCCESS: {
      const user = action.payload.user;
      const userRoles = user.roles || [];
      const role: Role = action.payload.role;
      const rolePrincipals = role.principals;
      let updateState = Object.assign({}, state);
      updateState.entities[role.id].principals = rolePrincipals.filter(rp => rp.principalId !== user.id);
      return updateState;
    }
    default: {
      return state;
    }
  }
}
