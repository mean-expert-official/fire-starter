import { Component } from '@angular/core';
import { UiService } from '../../ui.service';

@Component({
  selector: 'fire-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(public uiService: UiService) {

  }
}
