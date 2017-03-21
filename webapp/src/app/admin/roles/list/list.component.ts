import { Component } from '@angular/core';
import { Role } from '../../../shared/sdk/models/Role'
import { FireLoopRef } from '../../../shared/sdk/models/FireLoopRef'
import { RealTime } from '../../../shared/sdk/services/core/real.time'

@Component({
  selector: 'app-role-list',
  template: `
    <app-role-form (create)="create($event)"></app-role-form>
    <ul *ngIf="roleRef" class="list-unstyled mb-0 mt-3 px-3">
      <li *ngFor="let role of roles">
        <app-role-list-item
          (done)="done($event)"
          (update)="update($event)"
          (remove)="remove($event)" [role]="role"></app-role-list-item>
      </li>
    </ul>
  `,
})
export class ListComponent {

  private roles: Role[] = new Array<Role>();
  private roleRef: FireLoopRef<Role>;

  constructor(private rt: RealTime) {
    this.rt.onReady().subscribe(() => {
      this.roleRef = this.rt.FireLoop.ref<Role>(Role);
      this.roleRef.on('change').subscribe((roles: Role[]) => this.roles = roles);
      // this.roleRef.stats().subscribe((stats: any) => {
      //   let data = new Array();
      //   stats.forEach((stat: any) => {
      //     data.push(stat.count);
      //   });
      // });
    });
  }

  create(role: Role): void {
    this.roleRef.create(role).subscribe();
  }

  update(role: Role): void {
    this.roleRef.upsert(role).subscribe();
  }

  remove(role: Role): void {
    this.roleRef.remove(role).subscribe();
  }

}
