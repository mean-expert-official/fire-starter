import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Container } from '../../shared/sdk/models';
import { Subscription } from 'rxjs/Subscription';
import { FileService } from '../file.service';

@Component({
  selector: 'fire-upload-form',
  styleUrls: ['../file.component.scss'],
  templateUrl: './upload-form.component.html',
})
export class UploadFormComponent {

  @Input() containers;
  @Input() formConfig;
  @Input() item;
  @Output() action = new EventEmitter();

  private files: any[];
  public activeContainer: string;
  private subscriptions: Subscription[] = new Array<Subscription>();
  public uploadUrl: string = null;
  public hasBaseDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  constructor(public fileService: FileService) { }
}
