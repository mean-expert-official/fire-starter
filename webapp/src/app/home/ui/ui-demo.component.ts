import { Component, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { UiService, NavItem } from '../../ui/ui.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'fire-home',
  template: `
  <fire-card icon="object-group"
            title="User Interface"
            [nav]="nav">
    <router-outlet></router-outlet>
  </fire-card>
  `,
  styleUrls: ['../home.component.scss']

})
export class UiDemoComponent implements OnDestroy {

  private subscriptions: Subscription[] = new Array<Subscription>();
  public nav: NavItem[];

  constructor(
    private uiService: UiService,
    public router: Router
  ) {
    this.nav = [
      { name: 'Notifications', link: '/home/ui/notifications', icon: 'comments' },
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
