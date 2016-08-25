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
import { Auth } from '../../authentication/auth.service';
import { EnableButtonDirective } from '../../directives/enable.directive';


@Component({
  selector: 'my-form',
  templateUrl: './client/app/components/form/form.component.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES, FormItemComponent, EnableButtonDirective],
  providers: [HTTP_PROVIDERS, SocketService],
  styleUrls: ['./client/app/components/form/form.component.css']
})

export class FormComponent {
  @ViewChildren(FormItemComponent) formItemComponents;
  servers = [new ipPort(null, null, null, null)];
  numReqModel;
  signInNotifier = false;
  lb: boolean;
  _subscription: any;

  constructor(private Router: Router, private SocketService: SocketService, private Auth: Auth) {
    this.lb = Auth.lbStatus;
    this._subscription = Auth.lbUp.subscribe((val) => {
      this.lb = val;
      console.log('event detected from form component')
    });
  }


  onSubmit() {
    if (!!this.Auth.authenticated()) {

      let models = this.formItemComponents._results.map((item) => { return item.model });
      models = models.slice(0, models.length - 1);

      let formData = {
        authUserId: JSON.parse(localStorage.getItem('profile')).user_id,
        servers: models,
        volume: this.numReqModel
      }
      this.SocketService.sendServers(formData);

      this.Router.navigate(['/graphs']);

    } else {
      this.signInNotifier = true;
    }
  }

  addFormItem(model: ipPort) {
    this.servers.push(model);
  }
}
