import { NgModule } from '@angular/core';
import { StoreModule, provideStore, INITIAL_STATE  } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AuthEffects, UserEffects } from './effects';
import { AuthReducer, UsersReducer } from './reducers';

@NgModule({
  imports: [
    StoreModule.provideStore({
      auth: AuthReducer,
      users: UsersReducer
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(AuthEffects),
    EffectsModule.run(UserEffects)
  ],
})
export class FireStoreModule { }
