import { Component } from '@angular/core';

@Component({
  selector: 'fire-note',
  template: `
    <fire-card icon="sticky-note-o" title="Notes" subTitle="A simple model with Create, Read, Update, Delete">
      <fire-note-list></fire-note-list>
    </fire-card>
  `,
  styles: []
})
export class NoteComponent {

}
