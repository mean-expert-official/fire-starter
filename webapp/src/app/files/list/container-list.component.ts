import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileService } from '../file.service';
import { UiService } from '../../ui/ui.service';

@Component({
  selector: 'fire-container-list',
  styleUrls: ['../file.component.scss'],
  template: `
  <div class="row">
    <div class="col-12">
      <table *ngIf="fileService.filesToContainers"
             class="table table-striped table-sm"
             [class.table-responsive]="!uiService.isLargeScreen">
        <thead>
          <tr>
            <th *ngFor="let header of fileService.getTableHeaders()">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of fileService.filesToContainers">
            <td>{{ item.container.name }}</td>
            <td>
              <div *ngFor="let file of item.files">
                <div class="row">
                  <div class="col-2">
                    <button *ngIf="file.ext === 'wav'"
                            type="button"
                            class="btn btn-sm btn-primary"
                            (click)="fileService.play(file)">
                      <i class="fa fa-fw fa-play"></i>
                    </button>
                  </div>
                  <div class="col-10">
                    <div class="alert alert-info alert-dismissible fade show mb-1"
                         role="alert">
                      <button type="button"
                              class="close"
                              data-dismiss="alert"
                              aria-label="Close"
                              (click)="fileService.deleteFile(item.container.name, file)">
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <strong>{{ file.name }}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <button type="button"
                      class="btn btn-danger btn-sm"
                      placement="bottom"
                      ngbTooltip="Delete Container"
                      (click)="fileService.delete(item)">
                <i class="fa fa-fw fa-trash-o"></i>&nbsp;
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `,
})
export class ContainerListComponent {

  @Output() action = new EventEmitter();

  constructor(
    public fileService: FileService,
    public uiService: UiService
  ) {

  }

}
