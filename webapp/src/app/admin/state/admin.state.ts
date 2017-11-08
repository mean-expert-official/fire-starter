import { EffectsModule } from '@ngrx/effects';

import {
  UserActions, UserActionTypes,
  RoleActions, RoleActionTypes,
  ControlActions, ControlActionTypes,
} from './actions';

import {
  UserEffects,
  RoleEffects,
  ControlEffects,
} from './effects';

import {
  FireAdminReducer, State,
} from './reducers';


export {
UserActions, UserActionTypes,
RoleActions, RoleActionTypes,
ControlActions, ControlActionTypes,
UserEffects,
RoleEffects,
ControlEffects,
FireAdminReducer, State
}

export const FireAdminEffects = [
  EffectsModule.runAfterBootstrap(UserEffects),
  EffectsModule.runAfterBootstrap(RoleEffects),
  EffectsModule.runAfterBootstrap(ControlEffects),
]
