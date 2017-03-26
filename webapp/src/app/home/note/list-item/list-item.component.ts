import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../../../shared/sdk/models/Note'

@Component({
  selector: 'app-note-list-item',
  template: `
    <div class="row my-2">
      <div class="input-group">
        <input class="form-control" name="note.id" [(ngModel)]="note.title"/>
        <span class="input-group-btn">
          <button class="btn btn-secondary btn-sm" (click)="update.emit(note)">Save</button>
        </span>
        <span class="input-group-btn">
          <button class="btn btn-secondary btn-sm" (click)="remove.emit(note)">Remove</button>
        </span>
      </div>
    </div>
  `,
})
export class ListItemComponent {

  @Input() public note: Note;

  @Output() update = new EventEmitter();
  @Output() remove = new EventEmitter();

}
