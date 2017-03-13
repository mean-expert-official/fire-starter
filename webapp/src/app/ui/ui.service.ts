import { Injectable } from '@angular/core';

import { ToastyService, ToastyConfig } from 'ng2-toasty';

@Injectable()
export class UIService {

  private sidebarActive: boolean;
  private sidebarOpen: boolean;
  private sidebarNav: any;

  constructor(
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
  ) {
    this.toastyConfig.limit = 10;
    this.toastyConfig.theme = 'bootstrap';
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

  toast(config: any) {
    switch (config.type) {
      case 'error':
        this.toastError(config.title, config.msg);
        break;
      case 'info':
        this.toastInfo(config.title, config.msg);
        break;
      case 'success':
        this.toastSuccess(config.title, config.msg);
        break;
      case 'wait':
        this.toastWait(config.title, config.msg);
        break;
      case 'warning':
        this.toastWarning(config.title, config.msg);
        break;
      default:
        this.toastDefault(config.title, config.msg);
        break;
    }
  }

  toastDefault(title, msg) {
    this.toastyService.default({
      title,
      msg,
    });
  }

  toastError(title, msg) {
    this.toastyService.error({
      title,
      msg,
    });
  }

  toastInfo(title, msg) {
    this.toastyService.info({
      title,
      msg,
    });
  }

  toastSuccess(title, msg) {
    this.toastyService.success({
      title,
      msg,
    });
  }

  toastWait(title, msg) {
    this.toastyService.wait({
      title,
      msg,
    });
  }

  toastWarning(title, msg) {
    this.toastyService.warning({
      title,
      msg,
    });
  }


}
