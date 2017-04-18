import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-upload-form',
  styleUrls: ['../file.component.scss'],
  template: `
  <div class="row align-items-center">
    <div class="col-12 col-md-6">
      <h4>Add Files</h4>
    </div>
    <div class="col-12 col-md-6 text-right">
      <h5 [class.text-primary]="uploader?.queue?.length">Upload Queue</h5>
      <p class="lead mb-0"><strong>Files in Queue: <span [class.text-primary]="uploader?.queue?.length">{{ uploader?.queue?.length }}</span></strong></p>
    </div>
  </div>
  <hr>
  <div class="row align-items-center">
    <div class="col-12 col-lg-7 mb-2">
      <div ng2FileDrop
           [ngClass]="{'file-over': hasBaseDropZoneOver}"
           (fileOver)="fileOverBase($event)"
           [uploader]="uploader"
           class="card drop-zone">
        <h5 class="text-primary">Drop Zone</h5>
        <i class="text-primary fa fa-cloud-upload fa-3x"
           aria-hidden="true"></i>
      </div>
    </div>
    <div class="col-12 col-lg-5 mb-2">
      <div class="row">
        <div class="col-12">
          <h5>Single Select</h5>
          <input class="text-center"
                 type="file"
                 ng2FileSelect
                 [uploader]="uploader" />
          <hr>
        </div>
        <div class="col-12">
          <h5>Multiple Select</h5>
          <input type="file"
                 ng2FileSelect
                 [uploader]="uploader"
                 multiple />
        </div>
      </div>
    </div>
  </div>
  <div *ngIf="uploader?.queue?.length"
       class="row">
    <div class="col-3">
      <p class="lead float-right"><strong>Upload Progress:</strong></p>
    </div>
    <div class="col-9 align-self-center pb-3">
      <div class="progress">
        <div class="progress-bar bg-success"
             role="progressbar"
             [ngStyle]="{ 'width': uploader.progress + '%' }"></div>
      </div>
    </div>
    <div class="col-12 col-lg-3">
      <button type="button"
              class="btn btn-primary btn-sm btn-block"
              (click)="uploadAll()"
              [disabled]="!uploader.getNotUploadedItems().length">
        <span class="fa fa-fw fa-upload"></span> Upload All
      </button>
      <button type="button"
              class="btn btn-warning btn-sm btn-block"
              (click)="uploader.cancelAll()"
              [disabled]="!uploader.isUploading">
        <span class="fa fa-fw fa-ban"></span> Cancel All
      </button>
      <button type="button"
              class="btn btn-danger btn-sm btn-block"
              (click)="uploader.clearQueue()"
              [disabled]="!uploader.queue.length">
        <span class="fa fa-fw fa-trash"></span> Remove All
      </button>
    </div>
    <div class="col-12 col-lg-9">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Progress</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of uploader.queue">
            <td><strong>{{ item?.file?.name }}</strong></td>
            <td nowrap>{{ item?.file?.size/1024/1024 | number:'.2' }} MB</td>
            <td>
              <div class="progress">
                <div class="progress-bar bg-success"
                     role="progressbar"
                     [ngStyle]="{ 'width': item.progress + '%' }"></div>
              </div>
            </td>
            <td class="text-center">
              <span *ngIf="item.isSuccess"><i class="fa fa-fw fa-check"></i></span>
              <span *ngIf="item.isCancel"><i class="fa fa-fw fa-ban"></i></span>
              <span *ngIf="item.isError"><i class="fa fa-fw fa"></i></span>
            </td>
            <td nowrap>
              <button type="button"
                      class="btn btn-primary btn-sm"
                      (click)="upload(item)"
                      [disabled]="item.isReady || item.isUploading || item.isSuccess">
                <span class="fa fa-fw fa-upload"></span>
              </button>
              <button type="button"
                      class="btn btn-warning btn-sm"
                      (click)="item.cancel()"
                      [disabled]="!item.isUploading">
                <span class="fa fa-fw fa-ban"></span>
              </button>
              <button type="button"
                      class="btn btn-danger btn-sm"
                      (click)="item.remove()">
                <span class="fa fa-fw fa-trash"></span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `,
})
export class UploadFormComponent {

  @Input() title;
  @Input() formConfig;
  @Input() item;
  @Output() action = new EventEmitter();

  handleAction($event) {
    switch ($event.type) {

      default:
        return this.action.emit($event);
    }
  }

  constructor() { }
}
