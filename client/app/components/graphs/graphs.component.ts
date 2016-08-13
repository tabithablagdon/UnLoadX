import {Component, Input, Output, EventEmitter} from '@angular/core';
import { statusCodeBar} from './statusCodeBar/statusCodeBar.graph';
import { latencyLineGraph } from './latencyLineGraph/latencyLineGraph.graph';
import { descriptiveInfo } from './descriptiveInfo/descriptiveInfo.info';
import { networkGraph } from './networkGraph/networkGraph.graph';
import { GraphsService } from './graphsService/graphs.service';
import { HTTP_PROVIDERS } from '@angular/http';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'graphs',
  template: `
    <div>
      <h3> Test Summary Page </h3>
      <h6> Note: Test result wait-times depend on # of requests. Please enjoy network architecture diagram while waiting. </h6>
      <button (click)="getTestSummaryData()"> Retrieve Test Summary </button>
      <networkGraph></networkGraph>
      <descriptiveInfo *ngIf="isDataAvailable" [requestData]="requestData"></descriptiveInfo>
      <statusCodeBar *ngIf="isDataAvailable" [requestData]="requestData"></statusCodeBar>
      <latencyLineGraph *ngIf="isDataAvailable" [requestData]="requestData"></latencyLineGraph>
    </div>
  `,
  directives: [latencyLineGraph, descriptiveInfo, networkGraph, statusCodeBar],
  providers: [GraphsService, HTTP_PROVIDERS]
})
 
export class Graphs {
  public requestData: {};
  isDataAvailable:boolean = false;

  constructor(private _GraphsService: GraphsService, private _http: Http) {}

  getTestSummaryData() { 
    return this._http.get('/api/request/1')
          .map(res => res)
          .subscribe(requests => {
            this.requestData = requests._body;
            this.isDataAvailable = true;
    });
  }
}


// Data Structure
// {"testId":1,"totalReqs":460,"latency":{"latencySet":[{"x":0,"y":0},{"x":1,"y":0}],
// "avg":0.001500000000000001,"max":0.01,"min":0,"stdDev":0.0035707142142714166},
// "status":[{"key":"200","values":[{"label":"Status Code","value":460}]}]}