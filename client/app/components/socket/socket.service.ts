import * as io from 'socket.io-client';
import { Injectable, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';


let requestData;
@Injectable()
export default class SocketService {
  private _url = 'http://localhost:3000';
  private _socket = io.connect(this._url);
  requestDataSource = new ReplaySubject();

  constructor() {
    this.setRequestData();
  }

  // service command that emits that requestData is available
  setRequestDataAvailable() {
    console.log('From SocketService.setRequestDataAvailable - Setting requestDataAvailable to true');
    this.requestDataSource.next(true);
  }

  setRequestData() {
    this._socket.on('receive-requests', function(requests) {
      requestData = requests;
      console.log('Received requests data from server', requestData);
      this.setRequestDataAvailable();
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
