import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NgStyle} from '@angular/common';


@Component({
  selector: 'descriptiveInfo',
  templateUrl: './client/app/components/graphs/descriptiveInfo/descriptiveInfo.component.html',
   styles: [`
     table {
       color: #FFF;
       font-size: 1.2em;
       font-weight: 500;
       border: 1px solid #FFF;
       width: 70%;
     }
     th {
       background-color: orange;
     }
     tr, td {
       padding: 1em;
     }
   `],
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
  @Output () dataReceived = new EventEmitter();
  constructor () {}

  ngOnInit() {
   this.parsedData = this.requestData;
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
   this.successRate = successes ? (successes / this.totalReqs) : 0;
  }

  keys() : Array<string> {
    return Object.keys(this.statusCodeCounts);
  }

}
