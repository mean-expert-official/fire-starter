import { Component } from '@angular/core';
import { NoteApi } from '../../../shared/sdk/services/custom/Note';
import { Note } from '../../../shared/sdk/models/Note';
import { UIService } from '../../../ui/ui.service';

@Component({
  selector: 'app-note-list',
  template: `
    <app-note-form (create)="create($event)"></app-note-form>
    <ul *ngIf="notes.length" class="list-unstyled mb-0 mt-3 px-3">
      <li *ngFor="let note of notes">
        <app-note-list-item
          (update)="update($event)"
          (remove)="remove($event)" [note]="note"></app-note-list-item>
      </li>
    </ul>
  `,
})
export class ListComponent {

  private notes: Note[] = [];

  constructor(
    private noteApi: NoteApi,
    private uiService: UIService,
  ) {
    this.find();
  }

  find(): void {
    this.noteApi
      .find()
      .subscribe((res: Note[]) => this.notes = res);
  }

  create(note: Note): void {
    this.noteApi
      .create(note)
      .subscribe(
      success => this.handleSuccess('create', success),
      error => this.handleError('create', error)
      );
  }

  update(note: Note): void {
    this.noteApi
      .upsert(note)
      .subscribe(
      success => this.handleSuccess('update', success),
      error => this.handleError('update', error)
      );
  }

  remove(note: Note): void {
    this.noteApi
      .deleteById(note.id)
      .subscribe(
      success => this.handleSuccess('remove', success),
      error => this.handleError('remove', error),
    );
  }

  handleSuccess(action, success) {
    this.uiService.toastSuccess(`Note ${action} success`, '');
    this.find();
  }

  handleError(action, error) {
    this.uiService.toastError(`Note ${action} error`, error.message);
  }

}
