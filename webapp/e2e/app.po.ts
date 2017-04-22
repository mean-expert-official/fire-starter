import { browser, element, by } from 'protractor';

export class WebappPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('fire-root h1')).getText();
  }
}
