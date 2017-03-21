/* tslint:disable */
import {
  Role
} from '../index';

declare var Object: any;
export interface RoleMappingInterface {
  id?: any;
  principalType?: string;
  principalId?: string;
  roleId?: any;
  role?: Role;
}

export class RoleMapping implements RoleMappingInterface {
  id: any;
  principalType: string;
  principalId: string;
  roleId: any;
  role: Role;
  constructor(data?: RoleMappingInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RoleMapping`.
   */
  public static getModelName() {
    return "RoleMapping";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RoleMapping for dynamic purposes.
  **/
  public static factory(data: RoleMappingInterface): RoleMapping{
    return new RoleMapping(data);
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
      name: 'RoleMapping',
      plural: 'RoleMappings',
      properties: {
        id: {
          name: 'id',
          type: 'any'
        },
        principalType: {
          name: 'principalType',
          type: 'string'
        },
        principalId: {
          name: 'principalId',
          type: 'string'
        },
        roleId: {
          name: 'roleId',
          type: 'any'
        },
      },
      relations: {
        role: {
          name: 'role',
          type: 'Role',
          model: 'Role'
        },
      }
    }
  }
}
