import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { UserEffects } from './shared/sdk/effects/user'
import { UsersReducer } from './shared/sdk/reducers/user'
import { AppAuthEffects } from './auth/auth.effects'

@NgModule({
  imports: [
    StoreModule.provideStore({
      user: UsersReducer,
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(AppAuthEffects),
    EffectsModule.run(UserEffects),
  ],
})
export class AppSoreModule { }
