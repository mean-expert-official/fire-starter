import { Component, OnDestroy, OnChanges } from '@angular/core';
import { Router } from "@angular/router";
import { Container } from '../shared/sdk/models';
import { FileService } from './file.service';
import { UiService, NavItem } from '../ui/ui.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'fire-file',
  template: `
    <fire-card icon="files-o"
              title="Files"
              [createButton]="fileService.getCardButtons()"
              [nav]="nav"
              (action)="fileService.create()">
      <router-outlet></router-outlet>
    </fire-card>
  `,
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnDestroy {

  private subscriptions: Subscription[] = new Array<Subscription>();
  public nav: NavItem[];

  constructor(
    public uiService: UiService,
    public fileService: FileService,
    public router: Router
  ) {
    this.nav = [
      { name: 'Containers', link: '/home/files/containers', icon: 'folder-open-o' },
      { name: 'Upload Files', link: '/home/files/upload', icon: 'upload' }
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
