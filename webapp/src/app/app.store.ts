import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { UserEffects } from './shared/sdk/effects/user'
import { UsersReducer } from './shared/sdk/reducers/user'
import { AppAuthEffects } from './auth/auth.effects'
import { NotificationEffects } from './home/notifications/state/notification.effects'
import { LoopbackAuthReducer } from './shared/sdk/reducers/auth'

@NgModule({
  imports: [
    StoreModule.provideStore({
      user: UsersReducer,
      auth: LoopbackAuthReducer,
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(AppAuthEffects),
    EffectsModule.run(UserEffects),
    EffectsModule.run(NotificationEffects),
  ],
})
export class AppStoreModule { }
