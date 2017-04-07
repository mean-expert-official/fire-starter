import { Component } from '@angular/core';
import { UIService } from '../../ui.service';
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  constructor(public uiService: UIService, public breadcrumbService: BreadcrumbService) {

  }
}
