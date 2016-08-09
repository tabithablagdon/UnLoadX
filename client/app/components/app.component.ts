import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ipPort } from './form/ipPort';
import { Graphs } from './graphs/graphs.component';
import {OnInit, AfterViewInit, ViewChild} from '@angular/core'; //


@Component({
  selector: 'my-app',
  template: `<h1 [style.color]="'orange'">UnLoadX</h1>
              <my-form></my-form>
              <graphs></graphs>`,
  directives: [FormComponent, Graphs]
})

export class AppComponent { 
}
