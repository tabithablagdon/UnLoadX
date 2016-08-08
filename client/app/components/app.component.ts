import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ipPort } from './form/ipPort';

@Component({
  selector: 'my-app',
  template: `<h1 [style.color]="'orange'">UnLoadX </h1>
              <my-form></my-form>`,
  directives: [FormComponent]
})

export class AppComponent { 
}
