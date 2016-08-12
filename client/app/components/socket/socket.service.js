import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';

@Injectable()

export class SocketService {
  private _url = 'http://localhost:3000';
  private _socket;
  public requestData;

  sendServers(serverPost) {
    this._socket.emit('receive-post', serverPost);
    console.log(`Emitted ${serverPost} to server socket`);
  }

  getRequests() {
    this._socket = io.connect(_url);
    this._socket.on('receive-requests', (requests) => {
      this.requestData = requests;
      console.log(`Received requests data from server ${this.requestData}`);
    });
  }

}
