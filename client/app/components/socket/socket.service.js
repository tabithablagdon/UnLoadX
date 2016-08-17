"use strict";
var io = require('socket.io-client');
var Subject_1 = require('rxjs/Subject');
var requestData;
var SocketService = (function () {
    function SocketService() {
        this._url = 'http://localhost:3000';
        this._socket = io.connect(this._url);
        this.subject = new Subject_1.Subject();
        this.requestDataAvailable = false;
        this.setRequestData();
    }
    SocketService.prototype.setRequestDataAvailable = function () {
        this.requestDataAvailable = true;
        console.log('Set requestDataAvailable to ', this.requestDataAvailable);
        this.subject.next(this.requestDataAvailable);
    };
    SocketService.prototype.getRequestDataAvailable = function () {
        return this.subject.asObservable();
    };
    SocketService.prototype.setRequestData = function () {
        console.log('socketServiceRequestData', requestData);
        this._socket.on('receive-requests', function (requests) {
            requestData = requests;
            console.log('Received requests data from server', requestData);
            this.setRequestDataAvailable();
        }.bind(this));
    };
    SocketService.prototype.sendServers = function (serverPost) {
        this._socket.emit('receive-post', serverPost);
        console.log("Emitted " + JSON.stringify(serverPost) + " to server socket");
    };
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
    SocketService.prototype.getData = function () {
        return requestData;
    };
    return SocketService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SocketService;
//# sourceMappingURL=socket.service.js.map