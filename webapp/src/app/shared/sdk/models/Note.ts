/* tslint:disable */

declare var Object: any;
export interface NoteInterface {
  "title": any;
  "content"?: any;
  "id"?: any;
  "createdAt"?: any;
  "updatedAt"?: any;
}

export class Note implements NoteInterface {
  "title": any;
  "content": any;
  "id": any;
  "createdAt": any;
  "updatedAt": any;
  constructor(data?: NoteInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Note`.
   */
  public static getModelName() {
    return "Note";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Note for dynamic purposes.
  **/
  public static factory(data: NoteInterface): Note{
    return new Note(data);
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
      name: 'Note',
      plural: 'Notes',
      properties: {
        "title": {
          name: 'title',
          type: 'any'
        },
        "content": {
          name: 'content',
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
      }
    }
  }
}
