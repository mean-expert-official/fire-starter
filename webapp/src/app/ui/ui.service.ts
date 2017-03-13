import { Injectable } from '@angular/core';

@Injectable()
export class UIService {

  private sidebarActive: boolean;
  private sidebarOpen: boolean;
  private sidebarNav: any;

  constructor() {
    this.sidebarActive = true;
    this.sidebarOpen = true;
  }

  activateSidebar() {
    this.sidebarActive = true;
  }

  deactivateSidebar() {
    this.sidebarActive = false;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  setSidebarNav(nav: any) {
    this.sidebarNav = nav;
  }

}
