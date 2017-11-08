import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ACL, ACLApi, LoopbackAction, LoopbackErrorActions } from '../../../sdk';
import { ControlActions, ControlActionTypes } from '../actions';
import { UiService } from '../../../ui/ui.service';

@Injectable()
export class ControlEffects {

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private controlApi: ACLApi,
    private uiService: UiService,
  ) { }

  @Effect()
  protected createControl: Observable<any> = this.actions$
    .ofType(ControlActionTypes.CREATE_CONTROL)
    .mergeMap((action: LoopbackAction) => this.controlApi.create(action.payload)
      .map((response: ACL) => new ControlActions.createControlSuccess(response, action.meta))
      .catch((error: any) => of(new ControlActions.createControlFail(error, action.meta))));

  @Effect({ dispatch: false })
  protected createControlSuccess = this.actions$
    .ofType(ControlActionTypes.CREATE_CONTROL_SUCCESS)
    .map(action => this.uiService.toastSuccess('Create Control Success', `The control for the <b><i>${action.payload.model}</i></b> model has been created successfully.`));

  @Effect({ dispatch: false })
  protected createControlFail = this.actions$
    .ofType(ControlActionTypes.CREATE_CONTROL_FAIL)
    .map(action => this.uiService.toastError('Create Control Fail', `${action.payload.message}`));

  @Effect()
  protected readControls: Observable<any> = this.actions$
    .ofType(ControlActionTypes.READ_CONTROLS)
    .mergeMap((action: LoopbackAction) => this.controlApi.find(action.payload)
      .map((response: Array<ACL>) => new ControlActions.readControlsSuccess(response, action.meta))
      .catch((error: any) => of(new ControlActions.readControlsFail(error, action.meta))));

  @Effect()
  protected updateControl: Observable<any> = this.actions$
    .ofType(ControlActionTypes.UPDATE_CONTROL)
    .mergeMap((action: LoopbackAction) => this.controlApi.patchAttributes(action.payload.id, action.payload)
      .map((response: ACL) => new ControlActions.updateControlSuccess(action.payload, action.meta))
      .catch((error: any) => of(new ControlActions.updateControlFail(error, action.meta))));

  @Effect({ dispatch: false })
  protected updateControlSuccess = this.actions$
    .ofType(ControlActionTypes.UPDATE_CONTROL_SUCCESS)
    .map(action => this.uiService.toastSuccess('Update Control Success', `The control for the <b><i>${action.payload.model}</i></b> model has been updated successfully.`));

  @Effect({ dispatch: false })
  protected updateControlFail = this.actions$
    .ofType(ControlActionTypes.UPDATE_CONTROL_FAIL)
    .map(action => this.uiService.toastError('Update Control Fail', `${action.payload.message}`));

  @Effect()
  protected deleteControl: Observable<any> = this.actions$
    .ofType(ControlActionTypes.DELETE_CONTROL)
    .mergeMap((action: LoopbackAction) => this.controlApi.deleteById(action.payload.id)
      .map((response: ACL) => new ControlActions.deleteControlSuccess(action.payload, action.meta))
      .catch((error: any) => of(new ControlActions.deleteControlFail(error, action.meta))));

  @Effect({ dispatch: false })
  protected deleteControlSuccess = this.actions$
    .ofType(ControlActionTypes.DELETE_CONTROL_SUCCESS)
    .map(action => this.uiService.toastSuccess('Delete Control Success', `The control for the <b><i>${action.payload.model}</i></b> model has been deleted successfully.`));

  @Effect({ dispatch: false })
  protected deleteControlFail = this.actions$
    .ofType(ControlActionTypes.DELETE_CONTROL_FAIL)
    .map(action => this.uiService.toastError('Delete Control Fail', `${action.payload.message}`));

}
