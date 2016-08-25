import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { FormItemComponent } from './form/formItem/formItem.component';
import { ipPort } from './types/ipPort';
import { Graphs } from './graphs/graphs.component';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { appRoutes } from './app.routing';
import { Auth } from '../authentication/auth.service';

@Component({
  selector: 'my-app',
  templateUrl: './client/app/components/app.component.html',
  styleUrls: ['./client/app/components/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [Auth]
})

export class AppComponent {

  constructor(private auth: Auth) {}

}
