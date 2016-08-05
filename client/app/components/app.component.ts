import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { ipPort } from './form/ipPort';

@Component({
  selector: 'my-app',
  template: `<my-form></my-form>`,
  directives: [FormComponent]
})

export class AppComponent { 
}
