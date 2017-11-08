import { NgModule } from '@angular/core';
import { StoreModule, provideStore, INITIAL_STATE  } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoopbackAuthReducer, LoopbackEffects, AccountEffects } from '../sdk';
import { FireAdminReducer, FireAdminEffects } from '../admin/state/admin.state';

@NgModule({
  imports: [
    StoreModule.provideStore({
      auth: LoopbackAuthReducer,
      admin: FireAdminReducer,
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    LoopbackEffects,
    FireAdminEffects,
  ],
})
export class CoreStoreModule { }
