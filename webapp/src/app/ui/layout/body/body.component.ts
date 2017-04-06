import { Component } from '@angular/core';
import { UIService } from '../../ui.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  constructor(public uiService: UIService) {

  }
}
