import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { UserEffects } from './shared/sdk/effects/user';
import { UsersReducer } from './shared/sdk/reducers/user';
import { AppAuthEffects } from './auth/auth.effects';
import { LoopbackAuthReducer } from './shared/sdk/reducers/auth';

import { RouterState } from '@ngrx/router-store';

@NgModule({
  imports: [
    StoreModule.provideStore({
      user: UsersReducer,
      auth: LoopbackAuthReducer,
      router: routerReducer
    },
      {
        router: {
          path: window.location.pathname + window.location.search
        }
      }),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(AppAuthEffects),
    EffectsModule.run(UserEffects),
    RouterStoreModule.connectRouter(),
  ],
})
export class AppStoreModule { }
export interface AppState {
  router: RouterState;
};
