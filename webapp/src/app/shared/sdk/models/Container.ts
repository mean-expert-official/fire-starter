/* tslint:disable */

declare var Object: any;
export interface ContainerInterface {
  "name": any;
  "id"?: any;
  "createdAt"?: any;
  "updatedAt"?: any;
}

export class Container implements ContainerInterface {
  "name": any;
  "id": any;
  "createdAt": any;
  "updatedAt": any;
  constructor(data?: ContainerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Container`.
   */
  public static getModelName() {
    return "Container";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Container for dynamic purposes.
  **/
  public static factory(data: ContainerInterface): Container {
    return new Container(data);
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
      name: 'Container',
      plural: 'Containers',
      properties: {
        "name": {
          "type": "string",
          "required": true
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
      }
    }
  }
}
