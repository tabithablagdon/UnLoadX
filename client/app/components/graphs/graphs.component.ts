import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HTTP_PROVIDERS, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

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
  providers: [SocketService]
})

export class Graphs implements OnInit {
  requestData;
  subscription: Subscription;
  isDataAvailable: boolean = false;
  clicked: boolean = false;
  loadingURL: string = 'http://blog.teamtreehouse.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif';
  checkURL: string = 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/3d-glossy-orange-orbs-icons-symbols-shapes/106567-3d-glossy-orange-orb-icon-symbols-shapes-check-mark5-ps.png';

  constructor(private _SocketService: SocketService, private _http: Http) {}

  getTestSummaryData() {
    this.clicked = true;
    this.requestData = this._SocketService.getData();
    this.isDataAvailable = true;
    console.log('Set requestData from SocketService to ', this.requestData);
  }

  ngOnInit() {
    // subscribes to replaySubject from SocketService listening to when requestData is available from the server

    this.subscription = this._SocketService.requestDataSource.subscribe({
      next: requestDataAvailable => {
        this.requestData = this._SocketService.getData();
        this.isDataAvailable = Boolean(requestDataAvailable);
        console.log(`GraphComponent - Changed isDataAvailable to ${this.isDataAvailable}`);
      },
      error: err => console.log(`Error subscribing to subject ${err.message}`),
      complete: () => console.log('Done subscribing')
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

}
