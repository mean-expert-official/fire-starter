/* tslint:disable */

declare var Object: any;
export interface ACLInterface {
  "model"?: string;
  "property"?: string;
  "accessType"?: string;
  "permission"?: string;
  "principalType"?: string;
  "principalId"?: string;
  "id"?: any;
}

export class ACL implements ACLInterface {
  "model": string;
  "property": string;
  "accessType": string;
  "permission": string;
  "principalType": string;
  "principalId": string;
  "id": any;
  constructor(data?: ACLInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ACL`.
   */
  public static getModelName() {
    return "ACL";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ACL for dynamic purposes.
  **/
  public static factory(data: ACLInterface): ACL{
    return new ACL(data);
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
      name: 'ACL',
      plural: 'ACLs',
      properties: {
        "model": {
          name: 'model',
          type: 'string'
        },
        "property": {
          name: 'property',
          type: 'string'
        },
        "accessType": {
          name: 'accessType',
          type: 'string'
        },
        "permission": {
          name: 'permission',
          type: 'string'
        },
        "principalType": {
          name: 'principalType',
          type: 'string'
        },
        "principalId": {
          name: 'principalId',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
