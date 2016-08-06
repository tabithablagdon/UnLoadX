import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/common';
import { NgForm }    from '@angular/common';
import {  
  REACTIVE_FORM_DIRECTIVES, 
  FormGroup, 
  FormControl, 
  FormBuilder
} from '@angular/forms';
import {FORM_DIRECTIVES} from '@angular/forms';
import { ipPort } from './ipPort';
import { FormService } from './formServices/form.service';
import { HTTP_PROVIDERS } from '@angular/http';

@Component({
  selector: 'my-form',
  templateUrl: "./client/app/components/form/form.component.html",
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
  providers: [FormService, HTTP_PROVIDERS]
})
export class FormComponent { 
 

  constructor(

    private _FormService: FormService

  ) { } // form builder simplify form initialization

  types = ['web server', 'image processor', 'other'];
  type = 'other';

  model = new ipPort('123.456.789', '8080', 'web processor');


  submitted = false;

  onSubmit() { 
    console.log(this.model);
    this._FormService.sendTest(this.model);
  }

  onChange(value){
    this.type = value;
    this.model.type =value;
  }

}