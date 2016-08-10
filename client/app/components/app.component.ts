import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ipPort } from './form/ipPort';
import { Graphs } from './graphs/graphs.component';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { appRoutes } from './app.routing';



@Component({
  selector: 'my-app',
  template: `<h1 [style.color]="'orange'">UnLoadX</h1>
              <router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES]
})

export class AppComponent { 
}
