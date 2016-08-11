import { Component } from '@angular/core';
import { Validators, NgForm } from '@angular/common';
import {
  REACTIVE_FORM_DIRECTIVES,
  FormGroup,
  FormControl,
  FormBuilder,
  FORM_DIRECTIVES
} from '@angular/forms';
import { ipPort } from '../../types/ipPort';
import { FormService } from '../formServices/form.service';
import { HTTP_PROVIDERS } from '@angular/http';

@Component({
  selector: 'form-item',
  templateUrl: './client/app/components/form/formItem/formItem.component.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
  providers: [FormService, HTTP_PROVIDERS],
})

export class FormItemComponent {
  constructor(private _FormService: FormService) { }
  model = new ipPort('', '', '');
  formAdded = false;

  // Created a new form the first time the function is called
  onChange() {
    if (!(this.formAdded)) {
      this._FormService.addFormItem()
      this.formAdded = true;
    }
  }
}
