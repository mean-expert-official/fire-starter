/* tslint:disable */

declare var Object: any;
export interface ACLInterface {
  "model"?: any;
  "property"?: any;
  "accessType"?: any;
  "permission"?: any;
  "principalType"?: any;
  "principalId"?: any;
  "id"?: any;
}

export class ACL implements ACLInterface {
  "model": any;
  "property": any;
  "accessType": any;
  "permission": any;
  "principalType": any;
  "principalId": any;
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
          type: 'any'
        },
        "property": {
          name: 'property',
          type: 'any'
        },
        "accessType": {
          name: 'accessType',
          type: 'any'
        },
        "permission": {
          name: 'permission',
          type: 'any'
        },
        "principalType": {
          name: 'principalType',
          type: 'any'
        },
        "principalId": {
          name: 'principalId',
          type: 'any'
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
