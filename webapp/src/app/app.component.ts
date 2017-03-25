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
      'name': 'Authentication',
      'link': '/auth',
      'icon': 'lock'
    },
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
      'name': 'Notifications',
      'link': '/notifications',
      'icon': 'comments-o'
    },
  ];

  constructor(private uiService: UIService) {
    this.uiService.setSidebarNav(this.sidebarNav);
  }

}
