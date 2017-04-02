import { Component, OnDestroy, OnChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Container } from '../shared/sdk/models';
import { FileFormComponent } from './file-form.component';
import { FileService } from './file.service';
import { UIService } from '../ui/ui.service';
import { Subscription } from 'rxjs/Subscription';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnDestroy {

  private modalRef;
  private files;
  private uploadContainer: Container = new Container();
  private subscriptions: Subscription[] = new Array<Subscription>();
  public uploadUrl: string = null;
  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;

  constructor(
    private modal: NgbModal,
    private uiService: UIService,
    private fileService: FileService,
  ) {
    this.fileService.getFiles('test').subscribe((files: any) => (this.files = files));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  showDialog(type, item) {
    this.modalRef = this.modal.open(FileFormComponent, { size: 'sm' });
    this.modalRef.componentInstance.item = item;
    this.modalRef.componentInstance.formConfig = this.fileService.getFormConfig(type);
    this.modalRef.componentInstance.title = (type === 'create') ? 'Create Container' : 'Update Container';
    this.subscriptions.push(this.modalRef.componentInstance.action.subscribe(event => this.handleAction(event)));
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  create() {
    this.showDialog('create', new Container());
  }

  upload(file: any) {
    file.url = this.fileService.getUploadUrl(this.uploadContainer.name);
    this.handleAction({
      type: 'upload',
      payload: file
    });
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
    this.uiService.alertError(question, () => this.handleAction({ type: 'delete', payload: item.container }), () => { });
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
      <div class="alert alert-success fade show pb-2 mb-0">
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

  handleAction(event) {
    switch (event.type) {
      case 'create':
        this.subscriptions.push(this.fileService.containerApi
          .createContainer(event.payload).subscribe(() => {
            this.modalRef.close();
            this.fileService.refresh();
            this.uiService.toastSuccess('Container Created', 'The container was created successfully.');
          }, (err) => {
            this.modalRef.close();
            this.uiService.toastError('Create Container Failed', err.message || err.error.message);
          },
        ));
        break;
      case 'upload':
        this.uploader.uploadItem(event.payload);
        this.fileService.refresh();
        break;
      case 'getFiles':
        this.subscriptions.push(this.fileService.containerApi
          .getFiles(event.payload).subscribe((files: any) => {
            return files;
          }, (err) => {
            this.uiService.toastError('Get Files Failed', err.message || err.error.message);
          },
        ));
        break;
      case 'delete':
        this.subscriptions.push(this.fileService.containerApi
          .destroyContainer(event.payload.name).subscribe(() => {
            this.fileService.refresh();
            this.uiService.toastSuccess('Container Deleted', 'The container was deleted successfully.');
          },
          (err) => {
            this.uiService.toastError('Delete Container Failed', err.message || err.error.message);
          },
        ));
        break;
      case 'deleteFile':
        this.subscriptions.push(this.fileService.containerApi
          .removeFile(event.payload.container, event.payload.file.name).subscribe(() => {
            this.fileService.refresh();
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

}
