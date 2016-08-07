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
import { numReq } from './ipPort';
import { FormService } from './formServices/form.service';
import { HTTP_PROVIDERS } from '@angular/http';

@Component({
  selector: 'my-form',
  templateUrl: "./client/app/components/form/form.component.html",
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
  providers: [FormService, HTTP_PROVIDERS]
})

export class FormComponent { 
 
  constructor(private _FormService: FormService) { } // form builder simplify form initialization

  types = ['web server', 'image processor', 'other'];
  application_type = 'other';
  application_type2 = 'other';

  model = new ipPort('123.456.789', '8080', 'web processor');
  model2 = new ipPort('123.456.789', '8080', 'web processor');
  numReqModel = new numReq(0);

  onSubmit() { 
    this._FormService.sendTest({'servers':[this.model, this.model2], 'volume': this.numReqModel.numReq});
  }

  onChange(value){
    this.application_type = value;
    this.model.application_type =value;
  }

  onChange2(value){
    this.application_type2 = value;
    this.model2.application_type =value;
  }
}



















// import { Component, OnInit } from '@angular/core';
// import { Validators } from '@angular/common';
// import { NgForm }    from '@angular/common';
// import {  
//   REACTIVE_FORM_DIRECTIVES, 
//   FormGroup, 
//   FormControl, 
//   FormBuilder
// } from '@angular/forms';
// import {FORM_DIRECTIVES} from '@angular/forms';
// import { ipPort } from './ipPort';
// import { FormService } from './formServices/form.service';
// import { HTTP_PROVIDERS } from '@angular/http';

// @Component({
//   selector: 'my-form',
//   templateUrl: "./client/app/components/form/form.component.html",
//   directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
//   providers: [FormService]
// })

// export class FormComponent { 
 
//   constructor(private _FormService: FormService) { 

//   } // form builder simplify form initialization

//   types = ['web server', 'image processor', 'other'];
//   type = 'other';
//   type2 = 'other';
//   type3 = 'other';
//   numReq = 0;

//   model = new ipPort('123.456.789', '8080', 'web processor');
//   model2 = new ipPort('123.456.789', '8080', 'web processor');
//   model3 = new ipPort('123.456.789', '8080', 'web processor');


//   submitted = false;

//   onSubmit() { 
//     console.log(this.model);
//     this._FormService.sendTest([this.model]);
//   }

//   onChange(value){
//     this.type = value;
//     this.model.type =value;
//   }
//   onChange2(value){
//     this.type2 = value;
//     this.model2.type =value;
//   }
//   onChange3(value){
//     this.type3 = value;
//     this.model3.type =value;
//   }

// }


