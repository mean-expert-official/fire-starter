/* tslint:disable */
import { Injectable } from '@angular/core';
import { ACL } from '../../models/ACL';
import { RoleMapping } from '../../models/RoleMapping';
import { Role } from '../../models/Role';
import { Todo } from '../../models/Todo';
import { Note } from '../../models/Note';
import { Container } from '../../models/Container';
import { FireUser } from '../../models/FireUser';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    ACL: ACL,
    RoleMapping: RoleMapping,
    Role: Role,
    Todo: Todo,
    Note: Note,
    Container: Container,
    FireUser: FireUser,
    
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
