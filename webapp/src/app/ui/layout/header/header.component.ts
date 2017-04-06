import { Component } from '@angular/core';
import { UIService } from '../../ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public uiService: UIService) {

  }

  public appName = 'Fireloop Starter'
  logout() {

  }

}
