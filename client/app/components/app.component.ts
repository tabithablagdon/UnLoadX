import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { FormItemComponent } from './form/formItem/formItem.component';
import { ipPort } from './types/ipPort';
import { Graphs } from './graphs/graphs.component';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { appRoutes } from './app.routing';

@Component({
  selector: 'my-app',
  template: `
    <header>
      <div class="main-nav">
        <a routerLink="/"><button class="btn waves-effect waves-light orange">Home</button></a>
      </div>

      <span class="main-logo">UnLoadX</span><img src="https://cdn4.iconfinder.com/data/icons/orb/128/7.png"/>

    </header>
    <main>
    </main>
    <router-outlet></router-outlet>
  `,
  styles: [`
    img {
      max-width: 60;
      vertical-align: sub;
    }
    .main-logo {
      color: orange;
      font-size: 4em;
      font-weight: 400;
    }
    .main-nav {
      float: right;
    }
  `],
  directives: [ROUTER_DIRECTIVES]
})

export class AppComponent {
}
