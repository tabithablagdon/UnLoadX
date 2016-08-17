import * as io from 'socket.io-client';
import { Injectable, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
let requestData;
export default class SocketService {
  private _url = 'http://localhost:3000';
  private _socket = io.connect(this._url);
  private _requestDataSource = new ReplaySubject();
  requestDataAvailable$ = this._requestDataSource.asObservable();

  constructor() {
    this.setRequestData();
  }

  // service command that emits that requestData is available
  setRequestDataAvailable(dataAvailable) {
    console.log('From SocketService - Setting requestDataAvailable to... ', dataAvailable);
    this._requestDataSource.next(dataAvailable);
  }

  setRequestData() {
    this._socket.on('receive-requests', function(requests) {
      requestData = requests;
      console.log('Received requests data from server', requestData);
      this.setRequestDataAvailable(true);
    }.bind(this));
  }

  sendServers(serverPost) {
    this._socket.emit('receive-post', serverPost);
    console.log(`Emitted ${JSON.stringify(serverPost)} to server socket`);
  }

  getData() {
    return requestData;
  }

}
