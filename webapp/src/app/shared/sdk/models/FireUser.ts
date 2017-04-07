/* tslint:disable */
import {
  Role
} from '../index';

declare var Object: any;
export interface FireUserInterface {
  "firstName": any;
  "lastName": any;
  "realm"?: any;
  "username"?: any;
  "password": any;
  "email": any;
  "emailVerified"?: any;
  "verificationToken"?: any;
  "id"?: any;
  "createdAt"?: any;
  "updatedAt"?: any;
  accessTokens?: any[];
  roles?: Role[];
}

export class FireUser implements FireUserInterface {
  "firstName": any;
  "lastName": any;
  "realm": any;
  "username": any;
  "password": any;
  "email": any;
  "emailVerified": any;
  "verificationToken": any;
  "id": any;
  "createdAt": any;
  "updatedAt": any;
  accessTokens: any[];
  roles: Role[];
  constructor(data?: FireUserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FireUser`.
   */
  public static getModelName() {
    return "FireUser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FireUser for dynamic purposes.
  **/
  public static factory(data: FireUserInterface): FireUser{
    return new FireUser(data);
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
      name: 'FireUser',
      plural: 'FireUsers',
      properties: {
        "firstName": {
          name: 'firstName',
          type: 'any'
        },
        "lastName": {
          name: 'lastName',
          type: 'any'
        },
        "realm": {
          name: 'realm',
          type: 'any'
        },
        "username": {
          name: 'username',
          type: 'any'
        },
        "password": {
          name: 'password',
          type: 'any'
        },
        "email": {
          name: 'email',
          type: 'any'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'any'
        },
        "verificationToken": {
          name: 'verificationToken',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'any'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'any'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: ''
        },
        roles: {
          name: 'roles',
          type: 'Role[]',
          model: 'Role'
        },
      }
    }
  }
}
