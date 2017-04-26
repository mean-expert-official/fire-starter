/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';

export const ErrorActionTypes = {
  ERROR: type('[Error]'),
};

export const ErrorActions = {
  error: class implements Action {
    public type = ErrorActionTypes.ERROR;

    constructor(public payload: any) { }
  }
};
