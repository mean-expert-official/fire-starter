import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="container">
        <span class="text-muted">
          <a href="https://github.com/mean-expert-official/fireloop-demo-app">mean-expert-official/fireloop-demo-app</a>
        </span>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 60px;
      line-height: 60px;
      background-color: #f5f5f5;
      text-align: center;
    }
  `]
})
export class FooterComponent {

}
