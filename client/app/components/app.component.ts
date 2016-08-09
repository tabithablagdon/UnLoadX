import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ipPort } from './form/ipPort';
import { Main } from './graphs/graphs.component';
import {OnInit, AfterViewInit, ViewChild} from '@angular/core'; //


@Component({
  selector: 'my-app',
  template: `<h1 [style.color]="'orange'">UnLoadX </h1>
              <my-form></my-form>
              <main></main>`,
  directives: [FormComponent, Main]
})

export class AppComponent { 
}
