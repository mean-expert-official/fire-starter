import { Observable } from 'rxjs/Observable';
import { ACL } from '../../../sdk';
import { ControlActions, ControlActionTypes } from '../actions';
import { createSelector } from 'reselect';

export interface State {
  ids: string[];
  entities: { [id: string]: ACL };
  selectedIds: string[];
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedIds: []
}

export function ControlReducer(state: State = initialState, action: any): State {
  switch (action.type) {
    case ControlActionTypes.CREATE_CONTROL_SUCCESS: {
      const control: ACL = action.payload;
      let updateState = Object.assign({}, state);
      updateState.ids = [...state.ids, control.id.toString()];
      updateState.entities[control.id.toString()] = control;
      return updateState;
    }
    case ControlActionTypes.READ_CONTROLS_SUCCESS: {
      const controls: ACL[] = action.payload;
      const newControls = controls.filter(control => !state.entities[control.id.toString()]);
      const newControlIds = newControls.map(control => control.id.toString());
      const newControlEntities = newControls.reduce((entities: { [id: string]: ACL }, control: ACL) => {
        return Object.assign(entities, {
          [control.id.toString()]: control
        });
      }, {});
      let updateState = Object.assign({}, state);
      updateState.ids = [...state.ids, ...newControlIds];
      updateState.entities = Object.assign({}, state.entities, newControlEntities);
      updateState.selectedIds = updateState.ids;
      return updateState;
    }
    case ControlActionTypes.UPDATE_CONTROL_SUCCESS: {
      const control: ACL = action.payload;
      let updateState = Object.assign({}, state);
      updateState.entities[control.id.toString()] = control;
      return updateState;
    }
    case ControlActionTypes.DELETE_CONTROL_SUCCESS: {
      const control: ACL = action.payload;
      let updateState = Object.assign({}, state);
      updateState.ids = state.ids.filter(i => i !== control.id.toString());
      delete updateState.entities[control.id.toString()];
      return updateState;
    }
    default: {
      return state;
    }
  }
}
