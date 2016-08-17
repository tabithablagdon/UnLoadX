"use strict";
var io = require('socket.io-client');
var ReplaySubject_1 = require('rxjs/ReplaySubject');
var requestData;
var SocketService = (function () {
    function SocketService() {
        this._url = 'http://localhost:3000';
        this._socket = io.connect(this._url);
        this._requestDataSource = new ReplaySubject_1.ReplaySubject();
        this.requestDataAvailable$ = this._requestDataSource.asObservable();
        this.setRequestData();
    }
    // service command that emits that requestData is available
    SocketService.prototype.setRequestDataAvailable = function (dataAvailable) {
        console.log('From SocketService - Setting requestDataAvailable to... ', dataAvailable);
        this._requestDataSource.next(dataAvailable);
    };
    SocketService.prototype.setRequestData = function () {
        this._socket.on('receive-requests', function (requests) {
            requestData = requests;
            console.log('Received requests data from server', requestData);
            this.setRequestDataAvailable(true);
        }.bind(this));
    };
    SocketService.prototype.sendServers = function (serverPost) {
        this._socket.emit('receive-post', serverPost);
        console.log("Emitted " + JSON.stringify(serverPost) + " to server socket");
    };
    SocketService.prototype.getData = function () {
        return requestData;
    };
    return SocketService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SocketService;
//# sourceMappingURL=socket.service.js.map