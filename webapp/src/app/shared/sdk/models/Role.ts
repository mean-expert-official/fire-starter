/* tslint:disable */
import {
  RoleMapping
} from '../index';

declare var Object: any;
export interface RoleInterface {
  id?: any;
  name: string;
  description?: string;
  created?: Date;
  modified?: Date;
  principals?: RoleMapping[];
}

export class Role implements RoleInterface {
  id: any;
  name: string;
  description: string;
  created: Date;
  modified: Date;
  principals: RoleMapping[];
  constructor(data?: RoleInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Role`.
   */
  public static getModelName() {
    return "Role";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Role for dynamic purposes.
  **/
  public static factory(data: RoleInterface): Role{
    return new Role(data);
  }  
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Role',
      plural: 'Roles',
      properties: {
        id: {
          name: 'id',
          type: 'any'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        description: {
          name: 'description',
          type: 'string'
        },
        created: {
          name: 'created',
          type: 'Date'
        },
        modified: {
          name: 'modified',
          type: 'Date'
        },
      },
      relations: {
        principals: {
          name: 'principals',
          type: 'RoleMapping[]',
          model: 'RoleMapping'
        },
      }
    }
  }
}
