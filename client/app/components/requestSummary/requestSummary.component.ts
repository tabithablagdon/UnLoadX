import { Component, Input, OnInit } from '@angular/core';
import { statusCodeBar} from '../graphs/statusCodeBar/statusCodeBar.graph';
import { descriptiveInfo } from '../graphs/descriptiveInfo/descriptiveInfo.info';

@Component({
  selector: 'request-summary',
  templateUrl: './client/app/components/requestsummary/requestsummary.component.html',
  styleUrls: ['./client/app/components/requestsummary/requestsummary.component.css'],
  directives: [statusCodeBar, descriptiveInfo]
})

export class RequestSummaryComponent implements OnInit {
  @Input() requestData: any;
  totalReqs;
  statusCodeCounts;
  successRate;

  constructor() {}

  ngOnInit() {
   this.totalReqs = this.requestData.totalReqs
   this.summarizeStatusCodes(this.requestData.status);
  }

  summarizeStatusCodes(statusCodeArray) {
   this.statusCodeCounts = {};

   for (let i=0; i < statusCodeArray.length; i++) {
     this.statusCodeCounts[statusCodeArray[i].key] = statusCodeArray[i].y;
   }

   this.calculateSuccessRate(this.statusCodeCounts[200]);
  }

  calculateSuccessRate (successes) {
   this.successRate = successes ? Math.round((successes / this.totalReqs)) : 0;
  }

  keys() : Array<string> {
    return Object.keys(this.statusCodeCounts);
  }
}
