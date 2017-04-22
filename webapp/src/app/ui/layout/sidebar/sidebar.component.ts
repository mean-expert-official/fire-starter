import { Component } from '@angular/core';
import { UiService } from '../../ui.service';

@Component({
  selector: 'fire-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(public uiService: UiService) {

  }

}
