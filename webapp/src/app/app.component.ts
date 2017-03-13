import { Component } from '@angular/core';
import { LoopBackConfig } from './shared/sdk/index';
import { UIService } from './ui/ui.service';

@Component({
  selector: 'app-root',
  template: `
    <app-layout></app-layout>
    <ng2-toasty></ng2-toasty>
  `,

})
export class AppComponent {
  private sidebarNav: any = [
    {
      'name': 'Todos',
      'link': '/todos',
      'icon': 'check-square-o'
    },
    {
      'name': 'Notes',
      'link': '/notes',
      'icon': 'sticky-note-o'
    },
    {
      'name': 'Authentication',
      'link': '/auth',
      'icon': 'unlock'
    },
    {
      'name': 'Notifications',
      'link': '/notifications',
      'icon': 'rss'
    },
  ];

  constructor(private uiService: UIService) {
    LoopBackConfig.setBaseURL('//127.0.0.1:3000');
    LoopBackConfig.setApiVersion('api');

    this.uiService.setSidebarNav(this.sidebarNav);
  }
}
