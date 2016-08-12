import { Component, Output, EventEmitter } from '@angular/core';
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
  @Output() formUpdate: EventEmitter<ipPort>;
  constructor(private _FormService: FormService) {
    this.formUpdate = new EventEmitter<ipPort>();
  }
  model = new ipPort(null, null, null);
  formAdded = false;

  // Created a new form the first time the function is called
  onChange() {
    if (!(this.formAdded)) {
      this.formUpdate.emit(this.model);
      this.formAdded = true;
    }
  }

}
