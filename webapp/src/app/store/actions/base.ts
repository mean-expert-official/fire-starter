/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { LoopBackFilter } from '../../shared/sdk/models';

export function BaseActionTypesFactory(modelName: string): any {
  let types: any = {};

  types['CREATE'] = type('[' + modelName + '] Create');
  types['CREATE_SUCCESS'] = type('[' + modelName + '] Create Success');
  types['CREATE_FAIL'] = type('[' + modelName + '] Create Fail');

  types['CREATE_MANY'] = type('[' + modelName + '] CreateMany');
  types['CREATE_MANY_SUCCESS'] = type('[' + modelName + '] CreateMany Success');
  types['CREATE_MANY_FAIL'] = type('[' + modelName + '] CreateMany Fail');

  types['FIND_BY_ID'] = type('[' + modelName + '] FindById');
  types['FIND_BY_ID_SUCCESS'] = type('[' + modelName + '] FindById Success');
  types['FIND_BY_ID_FAIL'] = type('[' + modelName + '] FindById Fail');

  types['FIND'] = type('[' + modelName + '] Find');
  types['FIND_SUCCESS'] = type('[' + modelName + '] Find Success');
  types['FIND_FAIL'] = type('[' + modelName + '] Find Fail');

  types['FIND_ONE'] = type('[' + modelName + '] FindOne');
  types['FIND_ONE_SUCCESS'] = type('[' + modelName + '] FindOne Success');
  types['FIND_ONE_FAIL'] = type('[' + modelName + '] FindOne Fail');

  types['UPDATE_ALL'] = type('[' + modelName + '] UpdateAll');
  types['UPDATE_ALL_SUCCESS'] = type('[' + modelName + '] UpdateAll Success');
  types['UPDATE_ALL_FAIL'] = type('[' + modelName + '] UpdateAll Fail');

  types['DELETE_BY_ID'] = type('[' + modelName + '] DeleteById');
  types['DELETE_BY_ID_SUCCESS'] = type('[' + modelName + '] DeleteById Success');
  types['DELETE_BY_ID_FAIL'] = type('[' + modelName + '] DeleteById Fail');

  types['UPDATE_ATTRIBUTES'] = type('[' + modelName + '] UpdateAttributes');
  types['UPDATE_ATTRIBUTES_SUCCESS'] = type('[' + modelName + '] UpdateAttributes Success');
  types['UPDATE_ATTRIBUTES_FAIL'] = type('[' + modelName + '] UpdateAttributes Fail');

  types['UPSERT'] = type('[' + modelName + '] Upsert');
  types['UPSERT_SUCCESS'] = type('[' + modelName + '] Upsert Success');
  types['UPSERT_FAIL'] = type('[' + modelName + '] Upsert Fail');

  types['UPSERT_WITH_WHERE'] = type('[' + modelName + '] UpsertWithWhere');
  types['UPSERT_WITH_WHERE_SUCCESS'] = type('[' + modelName + '] UpsertWithWhere Success');
  types['UPSERT_WITH_WHERE_FAIL'] = type('[' + modelName + '] UpsertWithWhere Fail');

  types['REPLACE_OR_CREATE'] = type('[' + modelName + '] ReplaceOrCreate');
  types['REPLACE_OR_CREATE_SUCCESS'] = type('[' + modelName + '] ReplaceOrCreate Success');
  types['REPLACE_OR_CREATE_FAIL'] = type('[' + modelName + '] ReplaceOrCreate Fail');

  types['REPLACE_BY_ID'] = type('[' + modelName + '] ReplaceById');
  types['REPLACE_BY_ID_SUCCESS'] = type('[' + modelName + '] ReplaceById Success');
  types['REPLACE_BY_ID_FAIL'] = type('[' + modelName + '] ReplaceById Fail');

  types['PATCH_OR_CREATE'] = type('[' + modelName + '] PatchOrCreate');
  types['PATCH_OR_CREATE_SUCCESS'] = type('[' + modelName + '] PatchOrCreate Success');
  types['PATCH_OR_CREATE_FAIL'] = type('[' + modelName + '] PatchOrCreate Fail');

  types['PATCH_ATTRIBUTES'] = type('[' + modelName + '] PatchAttributes');
  types['PATCH_ATTRIBUTES_SUCCESS'] = type('[' + modelName + '] PatchAttributes Success');
  types['PATCH_ATTRIBUTES_FAIL'] = type('[' + modelName + '] PatchAttributes Fail');

  return types;
};

export function BaseActionsFactory<T>(modelName: string, actionTypes: any): any {
  const upperName = modelName.toUpperCase();

  let actions: any = {};

  actions.create = class implements Action {
    public readonly type = actionTypes['CREATE'];

    constructor(public payload: any) { }
  };

  actions.createSuccess = class implements Action {
    public readonly type = actionTypes['CREATE_SUCCESS'];

    constructor(public payload: T) { }
  }

  actions.createFail = class implements Action {
    public readonly type = actionTypes['CREATE_FAIL'];

    constructor(public payload: any) { }
  }

  actions.createMany = class implements Action {
    public readonly type = actionTypes['CREATE_MANY'];

    constructor(public payload: any) { }
  }

  actions.createManySuccess = class implements Action {
    public readonly type = actionTypes['CREATE_MANY_SUCCESS'];

    constructor(public payload: T[]) { }
  }

  actions.createManyFail = class implements Action {
    public readonly type = actionTypes['CREATE_MANY_FAIL'];

    constructor(public payload: any) { }
  }

  actions.findById = class implements Action {
    public readonly type = actionTypes['FIND_BY_ID'];

    constructor(public payload: { id: any, filter: LoopBackFilter }) { }
  }

  actions.findByIdSuccess = class implements Action {
    public readonly type = actionTypes['FIND_BY_ID_SUCCESS'];

    constructor(public payload: T) { }
  }

  actions.findByIdFail = class implements Action {
    public readonly type = actionTypes['FIND_BY_ID_FAIL'];

    constructor(public payload: any) { }
  }

  actions.find = class implements Action {
    public readonly type = actionTypes['FIND'];

    constructor(public payload: LoopBackFilter = {}) { }
  }

  actions.findSuccess = class implements Action {
    public readonly type = actionTypes['FIND_SUCCESS'];

    constructor(public payload: T[]) { }
  }

  actions.findFail = class implements Action {
    public readonly type = actionTypes['FIND_FAIL'];

    constructor(public payload: any) { }
  }

  actions.findOne = class implements Action {
    public readonly type = actionTypes['FIND_ONE'];

    constructor(public payload: LoopBackFilter = {}) { }
  }

  actions.findOneSuccess = class implements Action {
    public readonly type = actionTypes['FIND_ONE_SUCCESS'];

    constructor(public payload: T) { }
  }

  actions.findOneFail = class implements Action {
    public readonly type = actionTypes['FIND_ONE_FAIL'];

    constructor(public payload: any) { }
  }

  actions.updateAll = class implements Action {
    public readonly type = actionTypes['UPDATE_ALL'];

    constructor(public payload: { where: any, data: any }) { }
  }

  actions.updateAllSuccess = class implements Action {
    public readonly type = actionTypes['UPDATE_ALL_SUCCESS'];

    constructor(public payload: any) { }
  }

  actions.updateAllFail = class implements Action {
    public readonly type = actionTypes['UPDATE_ALL_FAIL'];

    constructor(public payload: any) { }
  }

  actions.deleteById = class implements Action {
    public readonly type = actionTypes['DELETE_BY_ID'];

    constructor(public payload: any) { }
  }

  actions.deleteByIdSuccess = class implements Action {
    public readonly type = actionTypes['DELETE_BY_ID_SUCCESS'];

    constructor(public payload: any) { }
  }

  actions.deleteByIdFail = class implements Action {
    public readonly type = actionTypes['DELETE_BY_ID_FAIL'];

    constructor(public payload: any) { }
  }

  actions.updateAttributes = class implements Action {
    public readonly type = actionTypes['UPDATE_ATTRIBUTES'];

    constructor(public payload: { id: any, data: any }) { }
  }

  actions.updateAttributesSuccess = class implements Action {
    public readonly type = actionTypes['UPDATE_ATTRIBUTES_SUCCESS'];

    constructor(public payload: any) { }
  }

  actions.updateAttributesFail = class implements Action {
    public readonly type = actionTypes['UPDATE_ATTRIBUTES_FAIL'];

    constructor(public payload: any) { }
  }

  actions.upsert = class implements Action {
    public readonly type = actionTypes['UPSERT'];

    constructor(public payload: any) { }
  }

  actions.upsertSuccess = class implements Action {
    public readonly type = actionTypes['UPSERT_SUCCESS'];

    constructor(public payload: any) { }
  }

  actions.upsertFail = class implements Action {
    public readonly type = actionTypes['UPSERT_FAIL'];

    constructor(public payload: any) { }
  }

  actions.upsertWithWhere = class implements Action {
    public readonly type = actionTypes['UPSERT_WITH_WHERE'];

    constructor(public payload: { where: any, data: any }) { }
  }

  actions.upsertWithWhereSuccess = class implements Action {
    public readonly type = actionTypes['UPSERT_WITH_WHERE_SUCCESS'];

    constructor(public payload: any) { }
  }

  actions.upsertWithWhereFail = class implements Action {
    public readonly type = actionTypes['UPSERT_WITH_WHERE_FAIL'];

    constructor(public payload: any) { }
  }

  actions.replaceOrCreate = class implements Action {
    public readonly type = actionTypes['REPLACE_OR_CREATE'];

    constructor(public payload: any) { }
  }

  actions.replaceOrCreateSuccess = class implements Action {
    public readonly type = actionTypes['REPLACE_OR_CREATE_SUCCESS'];

    constructor(public payload: any) { }
  }

  actions.replaceOrCreateFail = class implements Action {
    public readonly type = actionTypes['REPLACE_OR_CREATE_FAIL'];

    constructor(public payload: any) { }
  }

  actions.replaceById = class implements Action {
    public readonly type = actionTypes['REPLACE_BY_ID'];

    constructor(public payload: { id: any, data: any }) { }
  }

  actions.replaceByIdSuccess = class implements Action {
    public readonly type = actionTypes['REPLACE_BY_ID_SUCCESS'];

    constructor(public payload: any) { }
  }

  actions.replaceByIdFail = class implements Action {
    public readonly type = actionTypes['REPLACE_BY_ID_FAIL'];

    constructor(public payload: any) { }
  }

  actions.patchOrCreate = class implements Action {
    public readonly type = actionTypes['PATCH_OR_CREATE'];

    constructor(public payload: any) { }
  }

  actions.patchOrCreateSuccess = class implements Action {
    public readonly type = actionTypes['PATCH_OR_CREATE_SUCCESS'];

    constructor(public payload: any) { }
  }

  actions.patchOrCreateFail = class implements Action {
    public readonly type = actionTypes['PATCH_OR_CREATE_FAIL'];

    constructor(public payload: any) { }
  }

  actions.patchAttributes = class implements Action {
    public readonly type = actionTypes['PATCH_ATTRIBUTES'];

    constructor(public payload: { id: any, data: any }) { }
  }

  actions.patchAttributesSuccess = class implements Action {
    public readonly type = actionTypes['PATCH_ATTRIBUTES_SUCCESS'];

    constructor(public payload: any) { }
  }

  actions.patchAttributesFail = class implements Action {
    public readonly type = actionTypes['PATCH_ATTRIBUTES_FAIL'];

    constructor(public payload: any) { }
  }

  return actions;
};
