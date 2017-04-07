import { Injectable, OnDestroy } from '@angular/core';
import { Container } from '../shared/sdk/models';
import { RealTime, ContainerApi } from '../shared/sdk/services';
import { Subscription } from 'rxjs/Subscription';
import { FormService } from '../ui/form/ui-form.service';
import { Observable } from 'rxjs/Observable';
import { sortBy, split } from 'lodash';

export interface FilesToContainer {
  container: Container;
  files: any[];
}

@Injectable()
export class FileService implements OnDestroy {

  public containers: Container[] = new Array<Container>();
  public filesToContainers: FilesToContainer[];
  private subscriptions: Subscription[] = new Array<Subscription>();

  constructor(
    private formService: FormService,
    public containerApi: ContainerApi,
  ) {
    this.refresh();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  refresh() {
    this.subscriptions.push(
      this.containerApi.getContainers().subscribe(
        (containers: Container[]) => {
          this.containers = containers;
          this.setFilesToContainers();
        },
        (err) => {
          console.log(err);
        }));
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

  getCardButtons(type: string = 'default') {
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

  getTableHeaders() {
    return [
      'Container',
      'Files',
      'Actions',
    ];
  }

  deleteContainer(container: Container): Observable<Container> {
    return this.containerApi.destroyContainer(container.name);
  }

  getFormConfig(formType: string) {
    return {
      fields: this.getFormFields(formType),
      showCancel: true,
      action: formType === 'create' ? formType : 'upload',
    };
  }

  getUploadUrl(container: Container) {
    const apiConfig = window['apiConfig'];
    return [apiConfig.baseUrl, apiConfig.version, 'Containers', container, 'upload'].join('/');
  }

  getFiles(container: any): Observable<any> {
    const apiConfig = window['apiConfig'];
    let filesUrl = [apiConfig.baseUrl, apiConfig.version, 'Containers', container, 'files'].join('/');
    return this.containerApi.getFiles(container);
  }

  getFormFields(formType: string) {
    let fields = [
      this.formService.input('name', {
        label: 'Name',
        className: 'col-12',
        addonLeft: {
          class: 'fa fa-fw fa-tag'
        }
      }),
    ];
    return fields;
  }

}
