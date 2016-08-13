import { Component, OnInit, ViewChildren } from '@angular/core';
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
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { FormItemComponent } from './formItem/formItem.component';
import * as io from 'socket.io-client';
import SocketService from '../socket/socket.service';

@Component({
  selector: 'my-form',
  templateUrl: "./client/app/components/form/form.component.html",
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES, FormItemComponent],
  providers: [HTTP_PROVIDERS, SocketService],
})

export class FormComponent {
  @ViewChildren(FormItemComponent) formItemComponents;
  servers = [new ipPort(null, null, null)];
  numReqModel = new numReq(0);

  constructor(private Router: Router, private SocketService: SocketService) {}

  onSubmit() {
    let models = this.formItemComponents._results.map((item) => { return item.model });
    models = models.slice(0, models.length - 1);

    let formData = {
      servers: models,
      volume: this.numReqModel.numReq
    }
    this.SocketService.sendServers(formData);

    this.Router.navigate(['/graphs']);
  }

  addFormItem(model: ipPort) {
    this.servers.push(model);
  }
}
