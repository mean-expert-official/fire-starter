/* tslint:disable */
import {
  App,
  User
} from '../index';

declare var Object: any;
export interface OrganizationInterface {
  id?: number;
  name?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  apps?: App[];
  users?: User[];
}

export class Organization implements OrganizationInterface {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  apps: App[];
  users: User[];
  constructor(data?: OrganizationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Organization`.
   */
  public static getModelName() {
    return "Organization";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Organization for dynamic purposes.
  **/
  public static factory(data: OrganizationInterface): Organization{
    return new Organization(data);
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
      name: 'Organization',
      plural: 'Organizations',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        description: {
          name: 'description',
          type: 'string'
        },
        createdAt: {
          name: 'createdAt',
          type: 'Date'
        },
        updatedAt: {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
        apps: {
          name: 'apps',
          type: 'App[]',
          model: 'App'
        },
        users: {
          name: 'users',
          type: 'User[]',
          model: 'User'
        },
      }
    }
  }
}
