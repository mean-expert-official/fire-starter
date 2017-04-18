import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FileUploadModule } from 'ng2-file-upload';

import { UiModule } from '../ui/ui.module';
import { FileComponent } from './file.component';
import { FileFormComponent } from './form/file-form.component';
import { UploadFormComponent } from './form/upload-form.component';
import { ContainerListComponent } from './list/container-list.component';

import { FileService } from './file.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    FileUploadModule,
    RouterModule
  ],
  declarations: [
    FileComponent,
    FileFormComponent,
    UploadFormComponent,
    ContainerListComponent
  ],
  entryComponents: [
    FileFormComponent,
  ],
  exports: [
    FileComponent,
  ],
  providers: [
    FileService,
  ]
})
export class FileModule { }
