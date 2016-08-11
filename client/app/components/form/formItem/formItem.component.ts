import { Component, OnInit } from '@angular/core';
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
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
  selector: 'form-item',
  templateUrl: './client/app/components/form/formItem/formItem.component.html',
  // styleUrls: ['./client/assets/styles/materialize.css'],
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [FormService, HTTP_PROVIDERS],
})

export class FormItemComponent {
  _FormService: any;
  constructor(_FormService: FormService) {
    this._FormService = FormService;
  }
  model = new ipPort('', '', '');
}
