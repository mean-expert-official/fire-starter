import { Component } from '@angular/core';
import { UiService } from '../../ui.service';
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

@Component({
  selector: 'fire-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  constructor(public uiService: UiService, public breadcrumbService: BreadcrumbService) {

  }
}
