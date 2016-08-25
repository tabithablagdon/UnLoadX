import { Directive, ElementRef, Renderer } from '@angular/core';
import { Auth } from '../authentication/auth.service';

@Directive({ selector: '[btnEnable]' })
export class EnableButtonDirective {
  lb: boolean;
  _subscription: any;
  constructor(el: ElementRef, private Auth: Auth, renderer: Renderer) {

    this.lb = Auth.lbStatus;
    console.log(this.lb)
    this._subscription = Auth.lbUp.subscribe((val) => {
      this.lb = val;
      console.log('event detected from directive')
      console.log(el.nativeElement)
      console.log(el.nativeElement.style)
      el.nativeElement.style.disabled = 'true';
    });
  }
}
