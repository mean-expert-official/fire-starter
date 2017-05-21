/* tslint:disable */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';

import { ContainerActionTypes, ContainerActions } from '../actions/Container';
import { LoopbackErrorActions } from '../actions/error';
import { ContainerApi } from '../services/index';

@Injectable()
export class ContainerEffects extends BaseLoopbackEffects {
  @Effect()
  protected getContainers: Observable<LoopbackAction> = this.actions$
    .ofType(ContainerActionTypes.GET_CONTAINERS)
    .mergeMap((action: LoopbackAction) =>
      this.container.getContainers()
        .map((response) => new ContainerActions.getContainersSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new ContainerActions.getContainersFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected createContainer: Observable<LoopbackAction> = this.actions$
    .ofType(ContainerActionTypes.CREATE_CONTAINER)
    .mergeMap((action: LoopbackAction) =>
      this.container.createContainer(action.payload.options)
        .map((response) => new ContainerActions.createContainerSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new ContainerActions.createContainerFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected destroyContainer: Observable<LoopbackAction> = this.actions$
    .ofType(ContainerActionTypes.DESTROY_CONTAINER)
    .mergeMap((action: LoopbackAction) =>
      this.container.destroyContainer(action.payload.container)
        .map((response) => new ContainerActions.destroyContainerSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new ContainerActions.destroyContainerFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getContainer: Observable<LoopbackAction> = this.actions$
    .ofType(ContainerActionTypes.GET_CONTAINER)
    .mergeMap((action: LoopbackAction) =>
      this.container.getContainer(action.payload.container)
        .map((response) => new ContainerActions.getContainerSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new ContainerActions.getContainerFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getFiles: Observable<LoopbackAction> = this.actions$
    .ofType(ContainerActionTypes.GET_FILES)
    .mergeMap((action: LoopbackAction) =>
      this.container.getFiles(action.payload.container)
        .map((response) => new ContainerActions.getFilesSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new ContainerActions.getFilesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected getFile: Observable<LoopbackAction> = this.actions$
    .ofType(ContainerActionTypes.GET_FILE)
    .mergeMap((action: LoopbackAction) =>
      this.container.getFile(action.payload.container, action.payload.file)
        .map((response) => new ContainerActions.getFileSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new ContainerActions.getFileFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected removeFile: Observable<LoopbackAction> = this.actions$
    .ofType(ContainerActionTypes.REMOVE_FILE)
    .mergeMap((action: LoopbackAction) =>
      this.container.removeFile(action.payload.container, action.payload.file)
        .map((response) => new ContainerActions.removeFileSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new ContainerActions.removeFileFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected upload: Observable<LoopbackAction> = this.actions$
    .ofType(ContainerActionTypes.UPLOAD)
    .mergeMap((action: LoopbackAction) =>
      this.container.upload(action.payload.req, action.payload.res)
        .map((response) => new ContainerActions.uploadSuccess(action.payload.id, response, action.meta))
        .catch((error) => concat(
          of(new ContainerActions.uploadFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  protected download: Observable<LoopbackAction> = this.actions$
    .ofType(ContainerActionTypes.DOWNLOAD)
    .mergeMap((action: LoopbackAction) =>
      this.container.download(action.payload.container, action.payload.file, action.payload.req, action.payload.res)
        .map((response) => new ContainerActions.downloadSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error) => concat(
          of(new ContainerActions.downloadFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

    /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Decorate base effects metadata
   */
  @Effect() protected create;
  @Effect() protected createMany;
  @Effect() protected findById;
  @Effect() protected find;
  @Effect() protected findOne;
  @Effect() protected updateAll;
  @Effect() protected deleteById;
  @Effect() protected updateAttributes;
  @Effect() protected upsert;
  @Effect() protected upsertWithWhere;
  @Effect() protected replaceOrCreate;
  @Effect() protected replaceById;
  @Effect() protected patchOrCreate;
  @Effect() protected patchAttributes;

  constructor(
    @Inject(Actions) public actions$: Actions,
    @Inject(ContainerApi) public container: ContainerApi
  ) {
    super(actions$, container, 'Container', ContainerActionTypes, ContainerActions);
  }
}
