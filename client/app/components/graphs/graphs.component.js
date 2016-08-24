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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var socket_service_1 = require('../socket/socket.service');
var networkGraph_graph_1 = require('./networkGraph/networkGraph.graph');
var latency_component_1 = require('../latency/latency.component');
var requestSummary_component_1 = require('../requestSummary/requestSummary.component');
var serverhealth_component_1 = require('../serverhealth/serverhealth.component');
var Graphs = (function () {
    function Graphs(_SocketService, _http) {
        this._SocketService = _SocketService;
        this._http = _http;
        this.isDataAvailable = false;
        this.clicked = false;
        this.loadingURL = 'http://blog.teamtreehouse.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif';
        this.checkURL = 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/3d-glossy-orange-orbs-icons-symbols-shapes/106567-3d-glossy-orange-orb-icon-symbols-shapes-check-mark5-ps.png';
    }
    Graphs.prototype.getTestSummaryData = function () {
        this.clicked = true;
        this.requestData = this._SocketService.getData();
        this.isDataAvailable = true;
        console.log('Set requestData from SocketService to ', this.requestData);
    };
    Graphs.prototype.ngOnInit = function () {
        // subscribes to replaySubject from SocketService listening to when requestData is available from the server
        var _this = this;
        this.subscription = this._SocketService.requestDataSource.subscribe({
            next: function (requestDataAvailable) {
                _this.requestData = _this._SocketService.getData();
                _this.isDataAvailable = Boolean(requestDataAvailable);
                console.log("GraphComponent - Changed isDataAvailable to " + _this.isDataAvailable);
            },
            error: function (err) { return console.log("Error subscribing to subject " + err.message); },
            complete: function () { return console.log('Done subscribing'); }
        });
    };
    Graphs.prototype.ngOnDestroy = function () {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    };
    Graphs = __decorate([
        core_1.Component({
            selector: 'graphs',
            templateUrl: './client/app/components/graphs/graphs.component.html',
            styleUrls: ['./client/app/components/graphs/graphs.component.css'],
            directives: [networkGraph_graph_1.networkGraph, latency_component_1.LatencyComponent, requestSummary_component_1.RequestSummaryComponent, serverhealth_component_1.ServerHealthComponent],
            providers: [socket_service_1.default]
        }), 
        __metadata('design:paramtypes', [socket_service_1.default, http_1.Http])
    ], Graphs);
    return Graphs;
}());
exports.Graphs = Graphs;
//# sourceMappingURL=graphs.component.js.map