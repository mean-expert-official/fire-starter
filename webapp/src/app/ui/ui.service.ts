import { Injectable } from '@angular/core';
import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { assign, noop } from 'lodash';
import swal, { SweetAlertOptions } from 'sweetalert2';

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

  alert(options: any = {}, successCb = noop, closeCb = noop) {
    const defaultOptions: any = {
      type: options.type || null,
      title: options.title || null,
      text: options.text || null,
      buttonsStyling: options.buttonsStyling || false,
      confirmButtonClass: options.confirmButtonClass || 'btn btn-lg btn-secondary',
      animation: options.animation || true,
      customClass: options.customClass || '',
    }

    if (closeCb !== noop) {
      defaultOptions.showCancelButton = options.showCancelButton || true
      defaultOptions.cancelButtonClass = options.cancelButtonClass || 'btn btn-lg btn-secondary'
    }

    return swal(assign(defaultOptions, options))
      .then(res => successCb(res), dismiss => closeCb(dismiss))
  }

  alertSuccess(options: any = {}, successCb = noop, closeCb = noop) {
    const defaultOptions = {
      type: 'success',
      confirmButtonClass: 'btn btn-lg btn-success',
    }
    return this.alert(assign(defaultOptions, options), successCb, closeCb)
  }

  alertWarning(options: any = {}, successCb = noop, closeCb = noop) {
    const defaultOptions = {
      type: 'warning',
      confirmButtonClass: 'btn btn-lg btn-warning',
    }
    return this.alert(assign(defaultOptions, options), successCb, closeCb)
  }

  alertError(options: any = {}, successCb = noop, closeCb = noop) {
    const defaultOptions = {
      type: 'error',
      confirmButtonClass: 'btn btn-lg btn-danger',
    }
    return this.alert(assign(defaultOptions, options), successCb, closeCb)
  }

  alertInfo(options: any = {}, successCb = noop, closeCb = noop) {
    const defaultOptions = {
      type: 'info',
      confirmButtonClass: 'btn btn-lg btn-info',
    }
    return this.alert(assign(defaultOptions, options), successCb, closeCb)
  }

  alertQuestion(options: any = {}, successCb = noop, closeCb = noop) {
    const defaultOptions = {
      type: 'question',
      confirmButtonClass: 'btn btn-lg btn-primary',
    }
    return this.alert(assign(defaultOptions, options), successCb, closeCb)
  }

  confirm(options: any = {}, successCb = noop, closeCb = noop) {
    const defaultOptions: any = {
      type: options.type || 'warning',
      title: options.title || null,
      buttonsStyling: options.buttonsStyling || false,
      showConfirmButton: options.showConfirmButton || true,
      confirmButtonClass: options.confirmButtonClass || 'btn btn-lg btn-danger',
      confirmButtonText: options.confirmButtonText || 'Delete',
      animation: options.animation || true,
      customClass: options.customClass || '',
      showCancelButton: options.showCancelButton || true,
      cancelButtonClass: options.cancelButtonClass || 'btn btn-lg btn-secondary'
    }

    return swal(assign(defaultOptions, options))
      .then(res => successCb(res), dismiss => closeCb(dismiss))
  }

}
