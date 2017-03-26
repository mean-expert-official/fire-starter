import { Component, EventEmitter, Output } from '@angular/core';
import { Note } from '../../../shared/sdk/models/Note'

@Component({
  selector: 'app-note-form',
  template: `
    <form (submit)="submit()">
      <div class="input-group">
        <input class="form-control" required name="note" type="text" [(ngModel)]="note.title" placeholder="Add Note" />
        <span class="input-group-btn">
          <button class="btn btn-secondary">Add Note</button>
        </span>
      </div>
    </form>
  `,
})
export class FormComponent {

  public note: Note = new Note();

  submit() {
    this.create.emit(this.note);
    this.note = new Note();
  }

  @Output() create = new EventEmitter();
}
