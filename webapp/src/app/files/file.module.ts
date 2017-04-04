import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UiModule } from '../ui/ui.module';

import { FileComponent } from './file.component';
import { FileFormComponent } from './file-form.component';
import { FileUploadModule } from 'ng2-file-upload';

import { FileService } from './file.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    FileUploadModule
  ],
  declarations: [
    FileComponent,
    FileFormComponent,
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
