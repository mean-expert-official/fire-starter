import { Component } from '@angular/core';

@Component({
  selector: 'app-note',
  template: `
    <app-card title="Notes" subTitle="A simple model with Create, Read, Update, Delete">
      <app-note-list></app-note-list>
    </app-card>
  `,
  styles: []
})
export class NoteComponent {

}
