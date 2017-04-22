import { NgModule } from '@angular/core';
import { StoreModule, provideStore, INITIAL_STATE  } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { UserEffects } from './../shared/sdk/effects/user';
import { UsersReducer } from './../shared/sdk/reducers/user';
import { AppAuthEffects } from './../auth/auth.effects';
import { LoopbackAuthReducer } from './../shared/sdk/reducers/auth';
import { LoopbackAuthEffects } from './../shared/sdk/effects/auth';

@NgModule({
  imports: [
    StoreModule.provideStore({
      user: UsersReducer,
      auth: LoopbackAuthReducer
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(LoopbackAuthEffects),
    EffectsModule.run(UserEffects),
    EffectsModule.run(AppAuthEffects)
  ],
})
export class CoreStoreModule { }
