import {Component} from '@angular/core';

 
@Component({
  selector: 'descriptiveInfo',
  directives: [],
  template: `
    <h3 [style.color]="'blue'"> Descriptive Statistics </h3>
    <h4> Total Requests: 100 </h4>
    <h5> <span> Server 1: 50, </span> <span> Server 2: 50 </span> </h5> 
    <h5> Request Success Rate: 85% </h5>
    <h5> <span> Latency </span> <span> Avg: 2 ms, </span> <span> Min: 0 ms, </span> <span> Max: 3 ms, </span> 
    <span> Std Dev: .2 ms </span> </h5>
  `
})
 
export class descriptiveInfo {
  

 
}