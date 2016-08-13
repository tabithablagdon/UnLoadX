import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NgStyle} from '@angular/common';
 
@Component({
  selector: 'descriptiveInfo',
  template: `
    <h3 [style.color]="'blue'"> Descriptive Statistics </h3>
    <h4> Total Requests: {{totalReqs}} </h4>
    <h4> Request Success Rate: {{successRate | percent: '3.2-2'}}  </h4>
    <h4> Status Code Count: </h4>
    <span [ngStyle]="{'font-size':20}" *ngFor="let key of keys();"> Status Code {{key}}: {{statusCodeCounts[key]}} </span>
    <h4> Latency per request (in ms)- Avg: {{latencyAvg | number : '1.2-5'}}, Min: {{latencyMin | number : '1.2-5'}}, 
    Max: {{latencyMax | number : '1.2-5'}}, Std. Dev: {{latencyStdDev | number : '1.2-5'}} </h4>
  `,
   directives: [NgStyle],
   providers: []
})
 
export class descriptiveInfo implements OnInit {
  parsedData;
  totalReqs;
  latencyAvg;
  latencyMax;
  latencyMin;
  latencyStdDev;
  statusCodeCounts;
  successRate;

  @Input () requestData: any;
  @Output () dataReceived = new EventEmitter();
  constructor () {}
 
  ngOnInit() {
   this.parsedData = JSON.parse(this.requestData);
   this.totalReqs = this.parsedData.totalReqs
   this.latencyAvg = this.parsedData.latency.avg;
   this.latencyMin = this.parsedData.latency.min;
   this.latencyMax = this.parsedData.latency.max;
   this.latencyStdDev = this.parsedData.latency.stdDev;
   this.summarizeStatusCodes(this.parsedData.status);
  } 

  summarizeStatusCodes(statusCodeArray) {

   this.statusCodeCounts = {};

   for (let i=0; i < statusCodeArray.length; i++) {
     this.statusCodeCounts[statusCodeArray[i].key] = statusCodeArray[i].values[0].value;
   }

   this.calculateSuccessRate(this.statusCodeCounts[200]);
  }

  calculateSuccessRate (successes) {
   this.successRate = successes / this.totalReqs;
  }

  keys() : Array<string> {
    return Object.keys(this.statusCodeCounts);
  }

// [{"key":"200","values":[{"label":"Status Code","value":460}]},...]


}