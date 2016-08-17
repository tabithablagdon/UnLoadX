import * as io from 'socket.io-client';
import { Injectable, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
let requestData;
export default class SocketService {
  private _url = 'http://localhost:3000';
  private _socket = io.connect(this._url);
  private subject = new Subject();
  private requestDataAvailable = false;

  constructor() {
    this.setRequestData();
  }

  setRequestDataAvailable() {
    this.requestDataAvailable = true;
    console.log('Set requestDataAvailable to ', this.requestDataAvailable);
    this.subject.next(this.requestDataAvailable);
  }

  getRequestDataAvailable() {
    return this.subject.asObservable();
  }

  setRequestData() {
    console.log('socketServiceRequestData', requestData);
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

  // getRequests() {
  //   let observable = new Observable(observer => {
  //     this._socket.on('receive-requests', (request) => {
  //       this.requestData = request;
  //       console.log('Received requests data from server', this.requestData);
  //       observer.next(request);
  //     });
  //   });
  //   return observable;
  // }

  getData() {
    return requestData;
  }

}
