import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fire-shell',
  template: `
    <fire-layout></fire-layout>
    <ng2-toasty [position]="'bottom-right'"></ng2-toasty>
  `,
})
export class ShellComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
