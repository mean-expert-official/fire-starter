/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Todo } from '../../models/Todo';
import { App } from '../../models/App';
import { Organization } from '../../models/Organization';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Todo: Todo,
    App: App,
    Organization: Organization,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
