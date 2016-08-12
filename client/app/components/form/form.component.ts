import { Component, OnInit} from '@angular/core';
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
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES, FormItemComponent],
  providers: [FormService, HTTP_PROVIDERS],
})

export class FormComponent {
  servers = [new ipPort(null, null, null)];
  constructor(private _FormService: FormService, private Router: Router) {}

  numReqModel = new numReq(0);

  onSubmit() {
    this._FormService.sendTest(this.servers);
    // console.log({'servers':[this.model, this.model2], 'volume': this.numReqModel.numReq});
    this.Router.navigate(['/graphs']);
  }

  addFormItem(event: ipPort) {
    this.servers.push(event);
  }
}
