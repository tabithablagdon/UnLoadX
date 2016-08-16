"use strict";
var io = require('socket.io-client');
var requestData;
var SocketService = (function () {
    function SocketService() {
        this._url = 'http://localhost:3000';
        this._socket = io.connect(this._url);
        this.setRequestData();
    }
    SocketService.prototype.setRequestData = function () {
        console.log('socketServiceRequestData', requestData);
        this._socket.on('receive-requests', function (requests) {
            requestData = requests;
            console.log('Received requests data from server', requestData);
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