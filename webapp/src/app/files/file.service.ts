import { Injectable, OnDestroy } from '@angular/core';
import { Container } from '../shared/sdk/models';
import { RealTime, ContainerApi } from '../shared/sdk/services';
import { Subscription } from 'rxjs/Subscription';
import { FormService } from '../ui/form/ui-form.service';
import { CardButton } from '../ui/ui.service';
import { Observable } from 'rxjs/Observable';
import { sortBy, split } from 'lodash';
import { UiService } from '../ui/ui.service';
import { FileUploader } from 'ng2-file-upload';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileFormComponent } from './form/file-form.component';


export interface FilesToContainer {
  container: Container;
  files: any[];
}

@Injectable()
export class FileService implements OnDestroy {

  public containers: Container[] = new Array<Container>();
  public filesToContainers: FilesToContainer[];
  private subscriptions: Subscription[] = new Array<Subscription>();
  public uploader: FileUploader = new FileUploader({});
  private modalRef: any;

  constructor(
    private formService: FormService,
    public containerApi: ContainerApi,
    public uiService: UiService,
    private modal: NgbModal,
  ) {
    this.refresh();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  refresh(): void {
    this.subscriptions.push(
      this.containerApi.getContainers().subscribe(
        (containers: Container[]) => {
          if (containers.length) {
            this.containers = containers;
            this.setFilesToContainers();
          }
        },
        (err) => {
          console.log(err);
        }));
  }

  showDialog(type, item) {
    this.modalRef = this.modal.open(FileFormComponent, { size: 'sm' });
    this.modalRef.componentInstance.item = item;
    this.modalRef.componentInstance.formConfig = this.getFormConfig(type);
    this.modalRef.componentInstance.title = (type === 'create') ? 'Create Container' : 'Update Container';
    this.subscriptions.push(this.modalRef.componentInstance.action.subscribe(event => this.handleAction(event)));
  }

  handleAction(event) {
    switch (event.type) {
      case 'create':
        this.subscriptions.push(this.containerApi.createContainer(event.payload).subscribe(() => {
          this.modalRef.close();
          this.refresh();
          this.uiService.toastSuccess('Container Created', 'The container was created successfully.');
        }, (err) => {
          this.modalRef.close();
          this.uiService.toastError('Create Container Failed', err.message || err.error.message);
        },
        ));
        break;
      case 'upload':
        event.payload.file.url = this.getUploadUrl(event.payload.uploadContainer);
        console.log(event.payload.uploadContainer);
        this.uploader.uploadItem(event.payload.file);
        setTimeout(() => this.refresh(), 500);
        break;
      case 'uploadAll':
        const items = this.uploader.getNotUploadedItems().filter((item: any) => !item.isUploading);
        if (!items.length) {
          return;
        }
        items.forEach((item: any) => this.handleAction({ type: 'upload', payload: { file: item, uploadContainer: event.payload } }));
        break;
      case 'getFiles':
        this.subscriptions.push(this.containerApi
          .getFiles(event.payload).subscribe(
          (files: any) => files,
          (err) => { this.uiService.toastError('Get Files Failed', err.message || err.error.message) }));
        break;
      case 'delete':
        this.subscriptions.push(this
          .deleteContainer(event.payload.container).subscribe(
          (container: any) => {
            this.refresh();
            this.uiService.toastSuccess('Container Deleted', 'The container was deleted successfully.');
          },
          (err) => {
            this.uiService.toastError('Delete Container Failed', err.message || err.error.message);
          },
        ));
        break;
      case 'deleteFile':
        this.subscriptions.push(this.containerApi
          .removeFile(event.payload.container, event.payload.file.name).subscribe(() => {
            this.refresh();
            this.uiService.toastSuccess('File Deleted', 'The file was deleted successfully.');
          },
          (err) => {
            this.uiService.toastError('Delete File Failed', err.message || err.error.message);
          },
        ));
        break;
      default:
        return console.log('Unknown event action', event);
    }
  }

  create() {
    this.showDialog('create', new Container());
  }

  delete(item: any): void {
    const question = {
      title: 'Delete Container',
      html: `
        <p class="lead">Are you sure you want to delete container
          <span class="text-danger font-weight-bold font-italic">${item.container.name}</span> and all of its files?
        </p>
      `,
      confirmButtonText: 'Yes, Delete'
    };
    this.uiService.alertError(question, () => this.handleAction({ type: 'delete', payload: item }), () => { });
  }

  deleteFile(container: string, file: any): void {
    const question = {
      title: 'Delete File',
      html: `
        <p class="lead">Are you sure you want to delete file
          <span class="text-danger font-weight-bold font-italic">${file.name}</span>?
        </p>
      `,
      confirmButtonText: 'Yes, Delete'
    };
    this.uiService.alertError(question, () => this.handleAction({ type: 'deleteFile', payload: { container: container, file: file } }), () => { });
  }

  play(file: any) {
    const question = {
      title: 'Play Audio',
      html: `
      <hr>
      <h5 class="text-primary">${file.name}</h5>
      <hr>
      <div class="alert alert-info fade show pb-2 mb-0">
        <audio [title]="file.name" controls>
          <source src="${file.url}" type="audio/${file.ext === 'mp3' ? 'mpeg' : 'wav'}">
            Your browser does not support the audio tag.
        </audio>
      </div>

      `,
      confirmButtonText: 'Close',
      confirmButtonClass: 'btn btn-secondary btn-block'
    };
    this.uiService.alertSuccess(question);
  }

  setFilesToContainers(): void {
    const newMapping: FilesToContainer[] = [];
    this.containers.forEach(container => {
      this.subscriptions.push(
        this.containerApi.getFiles(container.name).subscribe(
          (files: any[]) => {
            files.forEach((file: any) => {
              const containerUrl = this.getUploadUrl(container.name).replace('upload', 'download');
              file.url = containerUrl + '/' + file.name;
              const fileExt = split(file.name, '.', 2)[1];
              file.ext = fileExt;
            });
            sortBy(files, 'name');
            const row = {
              container: container,
              files: files
            };
            newMapping.push(row);
          }));
      sortBy(newMapping);
      this.filesToContainers = newMapping;
    });
  }

  getCardButtons(type: string = 'default'): CardButton {
    switch (type) {
      case 'record':
        return {
          class: 'btn btn-secondary float-right',
          icon: 'microphone',
          text: 'Record'
        };
      default:
        return {
          class: 'btn btn-secondary btn-block float-right',
          icon: 'plus',
          text: 'Create Container'
        };
    }
  }

  getTableHeaders(): string[] {
    return [
      'Container',
      'Files',
      'Actions',
    ];
  }

  deleteContainer(container: Container): Observable<Container> {
    return this.containerApi.destroyContainer(container.name);
  }

  getFormConfig(formType: string): {} {
    return {
      fields: this.getFormFields(formType),
      showCancel: true,
      action: formType === 'create' ? formType : 'upload',
    };
  }

  getUploadUrl(container: any): string {
    const apiConfig = window['apiConfig'];
    return [apiConfig.baseUrl, apiConfig.version, 'Containers', container, 'upload'].join('/');
  }

  getFiles(container: any): Observable<any> {
    const apiConfig = window['apiConfig'];
    let filesUrl = [apiConfig.baseUrl, apiConfig.version, 'Containers', container, 'files'].join('/');
    return this.containerApi.getFiles(container);
  }

  getFormFields(formType: string): any[] {
    let fields = [
      this.formService.input('name', {
        label: 'Name',
        className: 'col-12',
        addonLeft: {
          class: 'fa fa-fw fa-folder-o'
        }
      }),
    ];
    return fields;
  }

}
