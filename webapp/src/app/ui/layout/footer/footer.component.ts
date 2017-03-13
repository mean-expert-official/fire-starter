import { Component } from '@angular/core';
import { UIService } from '../../ui.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private uiService: UIService) {

  }
}
