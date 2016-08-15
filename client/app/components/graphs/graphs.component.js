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
var statusCodeBar_graph_1 = require('./statusCodeBar/statusCodeBar.graph');
var latencyLineGraph_graph_1 = require('./latencyLineGraph/latencyLineGraph.graph');
var descriptiveInfo_info_1 = require('./descriptiveInfo/descriptiveInfo.info');
var networkGraph_graph_1 = require('./networkGraph/networkGraph.graph');
var socket_service_1 = require('../socket/socket.service');
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
require('rxjs/add/operator/map');
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
        var _this = this;
        this.clicked = true;
        console.log('Request Data AHAHAHA', this._SocketService.requestData);
        return this._http.get('/api/request/1')
            .map(function (res) { return res; })
            .subscribe(function (requests) {
            _this.requestData = requests._body;
            _this.isDataAvailable = true;
        });
    };
    Graphs = __decorate([
        core_1.Component({
            selector: 'graphs',
            template: "\n    <div class=\"test-stats\">\n      <h4>Test Results Summary</h4>\n      <p><small>Note: Test result wait-times depend on # of requests. Please enjoy network architecture diagram while waiting.</small></p>\n      <div class=\"row\">\n        <div class=\"col s6\">\n          <button (click)=\"getTestSummaryData()\" class=\"btn waves-effect waves-light\"> Retrieve Test Summary Statistics </button>\n        </div>\n        <div class=\"col s6\">\n          <img src={{loadingURL}} *ngIf=\"clicked && !isDataAvailable\"/>\n          <img src={{checkURL}} *ngIf=\"clicked && isDataAvailable\"/><br>\n          <span *ngIf=\"isDataAvailable\"> Results ready below. Thanks for waiting! </span>\n        </div>\n      </div>\n        <descriptiveInfo *ngIf=\"isDataAvailable\" [requestData]=\"requestData\"></descriptiveInfo>\n        <statusCodeBar *ngIf=\"isDataAvailable\" [requestData]=\"requestData\"></statusCodeBar>\n        <latencyLineGraph *ngIf=\"isDataAvailable\" [requestData]=\"requestData\"></latencyLineGraph>\n        <networkGraph></networkGraph>\n    </div>\n  ",
            styles: ["\n    img {\n      width: 50px;\n    }\n    .test-stats {\n      color: #FFF;\n    }\n  "],
            directives: [latencyLineGraph_graph_1.latencyLineGraph, descriptiveInfo_info_1.descriptiveInfo, networkGraph_graph_1.networkGraph, statusCodeBar_graph_1.statusCodeBar],
            providers: [socket_service_1.default, http_1.HTTP_PROVIDERS] //commented out SocketService
        }), 
        __metadata('design:paramtypes', [socket_service_1.default, http_2.Http])
    ], Graphs);
    return Graphs;
}());
exports.Graphs = Graphs;
// Data Structure
// {"testId":1,"totalReqs":460,"latency":{"latencySet":[{"x":0,"y":0},{"x":1,"y":0}],
// "avg":0.001500000000000001,"max":0.01,"min":0,"stdDev":0.0035707142142714166},
// "status":[{"key":"200","values":[{"label":"Status Code","value":460}]}]}
//# sourceMappingURL=graphs.component.js.map