"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var io = require('socket.io-client');
var core_1 = require('@angular/core');
var SocketService = (function () {
    function SocketService() {
        var _this = this;
        this._url = 'http://localhost:3000';
        this._socket = io.connect(this._url);
        this._socket.on('receive-requests', function (requests) {
            _this.requestData = requests;
            console.log('Received requests data from server', _this.requestData);
            alert('Received our mothaFing request Data from the server!!');
        });
    }
    SocketService.prototype.sendServers = function (serverPost) {
        this._socket.emit('receive-post', serverPost);
        console.log("Emitted " + serverPost + " to server socket");
    };
    SocketService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SocketService);
    return SocketService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SocketService;
//# sourceMappingURL=socket.service.js.map