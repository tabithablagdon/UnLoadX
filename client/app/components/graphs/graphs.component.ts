import { Component, Input, OnInit } from '@angular/core';
import { HTTP_PROVIDERS, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

import SocketService from '../socket/socket.service';
import { networkGraph } from './networkGraph/networkGraph.graph';
import { LatencyComponent } from '../latency/latency.component';
import { RequestSummaryComponent } from '../requestSummary/requestSummary.component';
import { ServerHealthComponent } from '../serverhealth/serverhealth.component';

@Component({
  selector: 'graphs',
  templateUrl: './client/app/components/graphs/graphs.component.html',
  styleUrls: ['./client/app/components/graphs/graphs.component.css'],
  directives: [networkGraph, LatencyComponent, RequestSummaryComponent, ServerHealthComponent],
  providers: [SocketService]
})

export class Graphs implements OnInit {
  requestData;
  subscription: Subscription;
  isDataAvailable: boolean = false;
  displayData: boolean = false;
  displayError: boolean = false;
  loadingURL: string = 'http://blog.teamtreehouse.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif';
  checkURL: string = 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/3d-glossy-orange-orbs-icons-symbols-shapes/106567-3d-glossy-orange-orb-icon-symbols-shapes-check-mark5-ps.png';

  constructor(private _SocketService: SocketService, private _http: Http) {}

  getTestSummaryData() {
    this.requestData = this._SocketService.getData();
    if (!this.requestData.hasOwnProperty('Servers')) {
      this.displayData = true;
      this.isDataAvailable = true;
    } else {
      this.displayError = true;
      this.isDataAvailable = true;
    }
    console.log('Set requestData from SocketService to ', this.requestData);
  }

  ngOnInit() {
    // subscribes to replaySubject from SocketService listening to when requestData is available from the server

    this.subscription = this._SocketService.requestDataSource.subscribe({
      next: requestDataAvailable => {
        this.requestData = this._SocketService.getData();
        if (!this.requestData.hasOwnProperty('Servers')) {
          this.isDataAvailable = Boolean(requestDataAvailable);
          console.log(`GraphComponent - Changed isDataAvailable to ${this.isDataAvailable}`);
        } else {
          this.displayError = true;
        }
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
