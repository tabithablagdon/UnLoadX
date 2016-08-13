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
var graphs_service_1 = require('./graphsService/graphs.service');
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
require('rxjs/add/operator/map');
var Graphs = (function () {
    function Graphs(_GraphsService, _http) {
        this._GraphsService = _GraphsService;
        this._http = _http;
        this.isDataAvailable = false;
        this.clicked = false;
        this.loadingURL = 'http://blog.teamtreehouse.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif';
        this.checkURL = 'data:image/png;base64,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';
    }
    Graphs.prototype.getTestSummaryData = function () {
        var _this = this;
        this.clicked = true;
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
            template: "\n    <div>\n      <h3> Test Summary Page </h3>\n      <h6> Note: Test result wait-times depend on # of requests. Please enjoy network architecture diagram while waiting. </h6>\n      <button (click)=\"getTestSummaryData()\"> Retrieve Test Summary </button>\n      <div>\n      <img src={{loadingURL}} *ngIf=\"clicked && !isDataAvailable\"/>\n      </div>\n      <div>\n      <img src={{checkURL}} *ngIf=\"clicked && isDataAvailable\"/>\n      <span *ngIf=\"isDataAvailable\"> Results ready below. Thanks for waiting! </span>\n      </div>\n      <networkGraph></networkGraph>\n      <descriptiveInfo *ngIf=\"isDataAvailable\" [requestData]=\"requestData\"></descriptiveInfo>\n      <statusCodeBar *ngIf=\"isDataAvailable\" [requestData]=\"requestData\"></statusCodeBar>\n      <latencyLineGraph *ngIf=\"isDataAvailable\" [requestData]=\"requestData\"></latencyLineGraph>\n    </div>\n  ",
            directives: [latencyLineGraph_graph_1.latencyLineGraph, descriptiveInfo_info_1.descriptiveInfo, networkGraph_graph_1.networkGraph, statusCodeBar_graph_1.statusCodeBar],
            providers: [graphs_service_1.GraphsService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [graphs_service_1.GraphsService, http_2.Http])
    ], Graphs);
    return Graphs;
}());
exports.Graphs = Graphs;
// Data Structure
// {"testId":1,"totalReqs":460,"latency":{"latencySet":[{"x":0,"y":0},{"x":1,"y":0}],
// "avg":0.001500000000000001,"max":0.01,"min":0,"stdDev":0.0035707142142714166},
// "status":[{"key":"200","values":[{"label":"Status Code","value":460}]}]} 
//# sourceMappingURL=graphs.component.js.map