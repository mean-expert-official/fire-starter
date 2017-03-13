import { Component } from '@angular/core';
import { UIService } from '../../ui.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private uiService: UIService) {

  }

}
