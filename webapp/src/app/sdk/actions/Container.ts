/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Container } from '../models';

export const ContainerActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Container'), {
  GET_CONTAINERS: type('[Container] getContainers'),
  GET_CONTAINERS_SUCCESS: type('[Container] getContainers success'),
  GET_CONTAINERS_FAIL: type('[Container] getContainers fail'),

  CREATE_CONTAINER: type('[Container] createContainer'),
  CREATE_CONTAINER_SUCCESS: type('[Container] createContainer success'),
  CREATE_CONTAINER_FAIL: type('[Container] createContainer fail'),

  DESTROY_CONTAINER: type('[Container] destroyContainer'),
  DESTROY_CONTAINER_SUCCESS: type('[Container] destroyContainer success'),
  DESTROY_CONTAINER_FAIL: type('[Container] destroyContainer fail'),

  GET_CONTAINER: type('[Container] getContainer'),
  GET_CONTAINER_SUCCESS: type('[Container] getContainer success'),
  GET_CONTAINER_FAIL: type('[Container] getContainer fail'),

  GET_FILES: type('[Container] getFiles'),
  GET_FILES_SUCCESS: type('[Container] getFiles success'),
  GET_FILES_FAIL: type('[Container] getFiles fail'),

  GET_FILE: type('[Container] getFile'),
  GET_FILE_SUCCESS: type('[Container] getFile success'),
  GET_FILE_FAIL: type('[Container] getFile fail'),

  REMOVE_FILE: type('[Container] removeFile'),
  REMOVE_FILE_SUCCESS: type('[Container] removeFile success'),
  REMOVE_FILE_FAIL: type('[Container] removeFile fail'),

  UPLOAD: type('[Container] upload'),
  UPLOAD_SUCCESS: type('[Container] upload success'),
  UPLOAD_FAIL: type('[Container] upload fail'),

  DOWNLOAD: type('[Container] download'),
  DOWNLOAD_SUCCESS: type('[Container] download success'),
  DOWNLOAD_FAIL: type('[Container] download fail'),

});
export const ContainerActions =
Object.assign(BaseLoopbackActionsFactory<Container>('Container', ContainerActionTypes), {

  /**
   * getContainers Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {any} meta (optional).
   * 
   */
  getContainers: class implements Action {
    public readonly type = ContainerActionTypes.GET_CONTAINERS;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * getContainersSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getContainersSuccess: class implements Action {
    public readonly type = ContainerActionTypes.GET_CONTAINERS_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getContainersFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getContainersFail: class implements Action {
    public readonly type = ContainerActionTypes.GET_CONTAINERS_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createContainer Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createContainer: class implements Action {
    public readonly type = ContainerActionTypes.CREATE_CONTAINER;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * createContainerSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createContainerSuccess: class implements Action {
    public readonly type = ContainerActionTypes.CREATE_CONTAINER_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createContainerFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createContainerFail: class implements Action {
    public readonly type = ContainerActionTypes.CREATE_CONTAINER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyContainer Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} container 
   * @param {any} meta (optional).
   * 
   */
  destroyContainer: class implements Action {
    public readonly type = ContainerActionTypes.DESTROY_CONTAINER;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * destroyContainerSuccess Action.
   * 
   * @param {any} id 
   * Data properties:
   *
   *  - `` – `{}` - 
   * @param {any} meta (optional).
   * 
   */
  destroyContainerSuccess: class implements Action {
    public readonly type = ContainerActionTypes.DESTROY_CONTAINER_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * destroyContainerFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyContainerFail: class implements Action {
    public readonly type = ContainerActionTypes.DESTROY_CONTAINER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getContainer Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} container 
   * @param {any} meta (optional).
   * 
   */
  getContainer: class implements Action {
    public readonly type = ContainerActionTypes.GET_CONTAINER;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * getContainerSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getContainerSuccess: class implements Action {
    public readonly type = ContainerActionTypes.GET_CONTAINER_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getContainerFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getContainerFail: class implements Action {
    public readonly type = ContainerActionTypes.GET_CONTAINER_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getFiles Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} container 
   * @param {any} meta (optional).
   * 
   */
  getFiles: class implements Action {
    public readonly type = ContainerActionTypes.GET_FILES;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * getFilesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getFilesSuccess: class implements Action {
    public readonly type = ContainerActionTypes.GET_FILES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getFilesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getFilesFail: class implements Action {
    public readonly type = ContainerActionTypes.GET_FILES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getFile Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} container 
   * @param {string} file 
   * @param {any} meta (optional).
   * 
   */
  getFile: class implements Action {
    public readonly type = ContainerActionTypes.GET_FILE;
      public payload: {container: any, file: any};

    constructor(container: any = {}, file: any = {}, public meta?: any) {
      this.payload = {container, file};
    }
  },
  /**
   * getFileSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  getFileSuccess: class implements Action {
    public readonly type = ContainerActionTypes.GET_FILE_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getFileFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getFileFail: class implements Action {
    public readonly type = ContainerActionTypes.GET_FILE_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * removeFile Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} container 
   * @param {string} file 
   * @param {any} meta (optional).
   * 
   */
  removeFile: class implements Action {
    public readonly type = ContainerActionTypes.REMOVE_FILE;
      public payload: {container: any, file: any};

    constructor(container: any = {}, file: any = {}, public meta?: any) {
      this.payload = {container, file};
    }
  },
  /**
   * removeFileSuccess Action.
   * 
   * @param {any} id 
   * Data properties:
   *
   *  - `` – `{}` - 
   * @param {any} meta (optional).
   * 
   */
  removeFileSuccess: class implements Action {
    public readonly type = ContainerActionTypes.REMOVE_FILE_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * removeFileFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  removeFileFail: class implements Action {
    public readonly type = ContainerActionTypes.REMOVE_FILE_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * upload Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   *  - `req` – `{object}` - 
   *
   *  - `res` – `{object}` - 
   * @param {any} meta (optional).
   * 
   */
  upload: class implements Action {
    public readonly type = ContainerActionTypes.UPLOAD;
      public payload: {req: any, res: any};

    constructor(req: any = {}, res: any = {}, public meta?: any) {
      this.payload = {req, res};
    }
  },
  /**
   * uploadSuccess Action.
   * 
   * @param {any} id 
   * Data properties:
   *
   *  - `result` – `{object}` - 
   * @param {any} meta (optional).
   * 
   */
  uploadSuccess: class implements Action {
    public readonly type = ContainerActionTypes.UPLOAD_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * uploadFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  uploadFail: class implements Action {
    public readonly type = ContainerActionTypes.UPLOAD_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * download Action.
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} container 
   * @param {string} file 
   * @param {object} req 
   * @param {object} res 
   * @param {any} meta (optional).
   * 
   */
  download: class implements Action {
    public readonly type = ContainerActionTypes.DOWNLOAD;
      public payload: {container: any, file: any, req: any, res: any};

    constructor(container: any = {}, file: any = {}, req: any = {}, res: any = {}, public meta?: any) {
      this.payload = {container, file, req, res};
    }
  },
  /**
   * downloadSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  downloadSuccess: class implements Action {
    public readonly type = ContainerActionTypes.DOWNLOAD_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * downloadFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  downloadFail: class implements Action {
    public readonly type = ContainerActionTypes.DOWNLOAD_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});