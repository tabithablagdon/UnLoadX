import {Component, Input, Output, EventEmitter} from '@angular/core';
import { statusCodeBar} from './statusCodeBar/statusCodeBar.graph';
import { latencyLineGraph } from './latencyLineGraph/latencyLineGraph.graph';
import { descriptiveInfo } from './descriptiveInfo/descriptiveInfo.info';
import { networkGraph } from './networkGraph/networkGraph.graph';
import SocketService  from '../socket/socket.service';
import { HTTP_PROVIDERS } from '@angular/http';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'graphs',
  template: `
    <div class="test-stats">
      <h4>Test Results Summary</h4>
      <p><small>Note: Test result wait-times depend on # of requests. Please enjoy network architecture diagram while waiting.</small></p>
      <div class="row">
        <div class="col s6">
          <button (click)="getTestSummaryData()" class="btn waves-effect waves-light"> Retrieve Test Summary Statistics </button>
        </div>
        <div class="col s6">
          <img src={{loadingURL}} *ngIf="clicked && !isDataAvailable"/>
          <img src={{checkURL}} *ngIf="clicked && isDataAvailable"/><br>
          <span *ngIf="isDataAvailable"> Results ready below. Thanks for waiting! </span>
        </div>
      </div>
        <descriptiveInfo *ngIf="isDataAvailable" [requestData]="requestData"></descriptiveInfo>
        <statusCodeBar *ngIf="isDataAvailable" [requestData]="requestData"></statusCodeBar>
        <latencyLineGraph *ngIf="isDataAvailable" [requestData]="requestData"></latencyLineGraph>
        <networkGraph></networkGraph>
    </div>
  `,
  styles: [`
    img {
      width: 50px;
    }
    .test-stats {
      color: #FFF;
    }
  `],
  directives: [latencyLineGraph, descriptiveInfo, networkGraph, statusCodeBar],
  providers: [SocketService, HTTP_PROVIDERS] //commented out SocketService
})

export class Graphs {
  public requestData: {};
  isDataAvailable:boolean = false;
  clicked:boolean = false;
  loadingURL = 'http://blog.teamtreehouse.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif';
  checkURL = 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/3d-glossy-orange-orbs-icons-symbols-shapes/106567-3d-glossy-orange-orb-icon-symbols-shapes-check-mark5-ps.png';

  constructor(private _SocketService: SocketService, private _http: Http) {}

  getTestSummaryData() {
    this.clicked = true;
     console.log('Request Data AHAHAHA', this._SocketService.requestData);
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
