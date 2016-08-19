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


@Component({
  selector: 'my-form',
  templateUrl: './client/app/components/form/form.component.html',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES, FormItemComponent],
  providers: [HTTP_PROVIDERS, SocketService],
  styles: [`
    h4 {
      color: orange
    }

    input {
      color: #FFF;
    }

    .form-box {
      background-color: rgba(255, 255, 255, .05);
      border: 1px solid #FFF;
      border-radius: 10px;
      padding: 2em;
      margin-top: 2.5em;
    }

    .form-submit {
      margin: 0 auto;
    }

    .main-text {
      color: #FFF;
      font-size: 1.4em;
      padding-left: 1.5em;
    }

    ul {
      list-style: square outside url('http://www.crbci.org/images/arrow-bullet-icon.png');
    }
    .notifier {
      color: red;
    }
  `]
})

export class FormComponent {
  @ViewChildren(FormItemComponent) formItemComponents;
  servers = [new ipPort(null, null, null)];
  numReqModel = new numReq(0);
  signInNotifier = false;

  constructor(private Router: Router, private SocketService: SocketService, private Auth: Auth) {}


  onSubmit() {
    if (!!this.Auth.authenticated()) {

      let models = this.formItemComponents._results.map((item) => { return item.model });
      models = models.slice(0, models.length - 1);

      let formData = {
        authUserId: JSON.parse(localStorage.getItem('profile')).user_id,
        servers: models,
        volume: this.numReqModel.numReq
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
