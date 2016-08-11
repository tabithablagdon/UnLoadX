import { Component, OnInit } from '@angular/core';
import { Validators, NgForm } from '@angular/common';
import {
  REACTIVE_FORM_DIRECTIVES,
  FormGroup,
  FormControl,
  FormBuilder,
  FORM_DIRECTIVES
} from '@angular/forms';
import { ipPort } from '../types/ipPort';
import { numReq } from '../types/numReq';
import { FormService } from './formServices/form.service';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { FormItemComponent } from './formItem/formItem.component';


@Component({
  selector: 'my-form',
  templateUrl: "./client/app/components/form/form.component.html",
  // template: '<form-item></form-item>',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES, FormItemComponent],
  providers: [FormService, HTTP_PROVIDERS]
})

export class FormComponent {

  constructor(private _FormService: FormService, private Router: Router) { } // form builder simplify form initialization

  types = ['web server', 'image processor', 'other'];
  application_type = 'other';
  application_type2 = 'other';

  model = new ipPort('123.456.789', '8080', 'web processor');
  model2 = new ipPort('123.456.789', '8080', 'web processor');
  numReqModel = new numReq(0);

  onSubmit() {
    this._FormService.sendTest({'servers':[this.model, this.model2], 'volume': this.numReqModel.numReq});
    alert('test submitted!...retrieving test summary data');
    this.Router.navigate(['/graphs']);
  }

  onChange(value){
    this.application_type = value;
    this.model.application_type = value;
  }

  onChange2(value){
    this.application_type2 = value;
    this.model2.application_type =value;
  }
}
