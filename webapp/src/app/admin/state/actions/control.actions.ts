import { Action } from '@ngrx/store';
import { type } from '../../../sdk/util';
import { ACL, LoopBackFilter } from '../../../sdk';

export const ControlActionTypes = {

  CREATE_CONTROL: type('[Admin] createControl'),
  CREATE_CONTROL_SUCCESS: type('[Admin] createControl success'),
  CREATE_CONTROL_FAIL: type('[Admin] createControl fail'),

  READ_CONTROLS: type('[Admin] readControls'),
  READ_CONTROLS_SUCCESS: type('[Admin] readControls success'),
  READ_CONTROLS_FAIL: type('[Admin] readControls fail'),

  UPDATE_CONTROL: type('[Admin] updateControl'),
  UPDATE_CONTROL_SUCCESS: type('[Admin] updateControl success'),
  UPDATE_CONTROL_FAIL: type('[Admin] updateControl fail'),

  DELETE_CONTROL: type('[Admin] deleteControl'),
  DELETE_CONTROL_SUCCESS: type('[Admin] deleteControl success'),
  DELETE_CONTROL_FAIL: type('[Admin] deleteControl fail'),

};

export const ControlActions = {

  createControl: class implements Action {
    public readonly type = ControlActionTypes.CREATE_CONTROL;
    constructor(public payload: ACL, public meta?: any) { }
  },

  createControlSuccess: class implements Action {
    public readonly type = ControlActionTypes.CREATE_CONTROL_SUCCESS;
    constructor(public payload: ACL, public meta?: any) { }
  },

  createControlFail: class implements Action {
    public readonly type = ControlActionTypes.CREATE_CONTROL_FAIL;
    constructor(public payload: any, public meta?: any) { }
  },

  readControls: class implements Action {
    public readonly type = ControlActionTypes.READ_CONTROLS;
    constructor(public payload: LoopBackFilter = {}, public meta?: any) { }
  },

  readControlsSuccess: class implements Action {
    public readonly type = ControlActionTypes.READ_CONTROLS_SUCCESS;
    constructor(public payload: ACL[], public meta?: any) { }
  },

  readControlsFail: class implements Action {
    public readonly type = ControlActionTypes.READ_CONTROLS_FAIL;
    constructor(public payload: any, public meta?: any) { }
  },

  updateControl: class implements Action {
    public readonly type = ControlActionTypes.UPDATE_CONTROL;
    constructor(public payload: ACL, public meta?: any) { }
  },

  updateControlSuccess: class implements Action {
    public readonly type = ControlActionTypes.UPDATE_CONTROL_SUCCESS;
    constructor(public payload: ACL, public meta?: any) { }
  },

  updateControlFail: class implements Action {
    public readonly type = ControlActionTypes.UPDATE_CONTROL_FAIL;
    constructor(public payload: any, public meta?: any) { }
  },

  deleteControl: class implements Action {
    public readonly type = ControlActionTypes.DELETE_CONTROL;
    constructor(public payload: any, public meta?: any) { }
  },

  deleteControlSuccess: class implements Action {
    public readonly type = ControlActionTypes.DELETE_CONTROL_SUCCESS;
    constructor(public payload: any, public meta?: any) { }
  },

  deleteControlFail: class implements Action {
    public readonly type = ControlActionTypes.DELETE_CONTROL_FAIL;
    constructor(public payload: any, public meta?: any) { }
  },

};
