import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    <app-card title="Users">
      <app-user-list></app-user-list>
    </app-card>
  `,
})

export class UsersComponent {

}
