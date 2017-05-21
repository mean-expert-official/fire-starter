import { Observable } from 'rxjs/Observable';
import { ActionReducer } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SDKToken } from './models/BaseModels';

import * as reducers from './reducers/index';

import * as effects from './effects/index';

export interface LoopbackStateInterface {
  auth: SDKToken;
};

export const LoopbackReducer = {
  loopbackAuth: reducers.LoopbackAuthReducer
};

export const LoopbackEffects = [
  EffectsModule.run(effects.LoopbackAuthEffects),
	EffectsModule.run(effects.AccessTokenEffects),
	EffectsModule.run(effects.ACLEffects),
	EffectsModule.run(effects.RoleMappingEffects),
	EffectsModule.run(effects.RoleEffects),
	EffectsModule.run(effects.TodoEffects),
	EffectsModule.run(effects.NoteEffects),
	EffectsModule.run(effects.ContainerEffects),
	EffectsModule.run(effects.AccountEffects),
];
