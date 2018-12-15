import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
// })

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
    <h1>Gamedia</h1>
            <nav>
              <a routerLink="/app.component" routerLinkActive="active"></a>
            </nav>
            <router-outlet></router-outlet>
  `
})

export class AppComponent {
  title = 'DatabaseApp';
}
