import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { HTTP_PROVIDERS, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { statusCodeBar} from './statusCodeBar/statusCodeBar.graph';
import { latencyLineGraph } from './latencyLineGraph/latencyLineGraph.graph';
import { descriptiveInfo } from './descriptiveInfo/descriptiveInfo.info';
import { networkGraph } from './networkGraph/networkGraph.graph';
import SocketService from '../socket/socket.service';

@Component({
  selector: 'graphs',
  templateUrl: './client/app/components/graphs/graphs.component.html',
  styles: [`
    img {
      width: 50px;
    }
    .test-stats {
      color: #FFF;
    }
  `],
  directives: [descriptiveInfo, networkGraph, statusCodeBar, latencyLineGraph],
  providers: [SocketService, HTTP_PROVIDERS]
})

export class Graphs {
  requestData = {};
  connection;
  isDataAvailable:boolean = false;
  clicked:boolean = false;
  loadingURL = 'http://blog.teamtreehouse.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif';
  checkURL = 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/3d-glossy-orange-orbs-icons-symbols-shapes/106567-3d-glossy-orange-orb-icon-symbols-shapes-check-mark5-ps.png';

  constructor(private _SocketService: SocketService, private _http: Http) {

  }

  getTestSummaryData() {

    this.clicked = true;
    this.requestData = this._SocketService.getData();
    this.isDataAvailable = true;
    console.log('Set requestData from SocketService to ', this.requestData);


    // http /GETrequest for data

    // return this._http.get('/api/request/1')
    //   .map(res => res)
    //   .subscribe(requests => {
    //     this.requestData = requests._body;
    //     this.isDataAvailable = true;
    // });
  }

  // ngOnInit() {
  //   this.connection = this._SocketService.getRequests()
  //     .subscribe(request => {
  //       this.requestData = request;
  //       console.log('Graphs Component requestData', this.requestData);
  //     });
  // }
}
