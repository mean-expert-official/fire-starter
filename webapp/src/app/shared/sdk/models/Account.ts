/* tslint:disable */
import {
  AccessToken,
  Role
} from '../index';

declare var Object: any;
export interface AccountInterface {
  "firstName": string;
  "lastName": string;
  "realm"?: string;
  "username"?: string;
  "password": string;
  "email": string;
  "emailVerified"?: boolean;
  "verificationToken"?: string;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  accessTokens?: AccessToken[];
  roles?: Role[];
}

export class Account implements AccountInterface {
  "firstName": string;
  "lastName": string;
  "realm": string;
  "username": string;
  "password": string;
  "email": string;
  "emailVerified": boolean;
  "verificationToken": string;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  accessTokens: AccessToken[];
  roles: Role[];
  constructor(data?: AccountInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Account`.
   */
  public static getModelName() {
    return "Account";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Account for dynamic purposes.
  **/
  public static factory(data: AccountInterface): Account{
    return new Account(data);
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
      name: 'Account',
      plural: 'Accounts',
      properties: {
        "firstName": {
          name: 'firstName',
          type: 'string'
        },
        "lastName": {
          name: 'lastName',
          type: 'string'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "verificationToken": {
          name: 'verificationToken',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'AccessToken[]',
          model: 'AccessToken'
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
