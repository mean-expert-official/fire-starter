/* tslint:disable */

declare var Object: any;
export interface TodoInterface {
  "text": string;
  "dueAt"?: Date;
  "done"?: boolean;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Todo implements TodoInterface {
  "text": string;
  "dueAt": Date;
  "done": boolean;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: TodoInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Todo`.
   */
  public static getModelName() {
    return "Todo";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Todo for dynamic purposes.
  **/
  public static factory(data: TodoInterface): Todo{
    return new Todo(data);
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
      name: 'Todo',
      plural: 'todos',
      properties: {
        "text": {
          name: 'text',
          type: 'string'
        },
        "dueAt": {
          name: 'dueAt',
          type: 'Date'
        },
        "done": {
          name: 'done',
          type: 'boolean',
          default: false
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
      }
    }
  }
}
