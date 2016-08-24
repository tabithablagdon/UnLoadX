import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NgStyle} from '@angular/common';


@Component({
  selector: 'descriptiveInfo',
  templateUrl: './client/app/components/graphs/descriptiveInfo/descriptiveInfo.component.html',
   styleUrls: ['./client/app/components/graphs/descriptiveInfo/descriptiveInfo.component.css'],
   directives: [NgStyle]
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

  constructor () {}

  ngOnInit() {
   this.parsedData = this.requestData;
   this.totalReqs = this.requestData.totalReqs
   this.latencyAvg = this.requestData.latency.avg;
   this.latencyMin = this.requestData.latency.min;
   this.latencyMax = this.requestData.latency.max;
   this.latencyStdDev = this.requestData.latency.stdDev;
   this.summarizeStatusCodes(this.requestData.status);
  }

  summarizeStatusCodes(statusCodeArray) {

   this.statusCodeCounts = {};

   for (let i=0; i < statusCodeArray.length; i++) {
     this.statusCodeCounts[statusCodeArray[i].key] = statusCodeArray[i].values[0].value;
   }

   this.calculateSuccessRate(this.statusCodeCounts[200]);
  }

  calculateSuccessRate (successes) {
   this.successRate = successes ? (successes / this.totalReqs) : 0;
  }

  keys() : Array<string> {
    return Object.keys(this.statusCodeCounts);
  }

}
