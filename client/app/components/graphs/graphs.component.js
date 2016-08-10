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
var successBarChart_graph_1 = require('./successBarChart/successBarChart.graph');
var latencyLineGraph_graph_1 = require('./latencyLineGraph/latencyLineGraph.graph');
var descriptiveInfo_info_1 = require('./descriptiveInfo/descriptiveInfo.info');
var networkGraph_graph_1 = require('./networkGraph/networkGraph.graph');
var graphs_service_1 = require('./graphsService/graphs.service');
var http_1 = require('@angular/http');
var Graphs = (function () {
    function Graphs(_GraphsService) {
        this._GraphsService = _GraphsService;
    }
    Graphs.prototype.getTestSummaryData = function () {
        this._GraphsService.getTestSummaryInfo();
    };
    Graphs = __decorate([
        core_1.Component({
            selector: 'graphs',
            template: "\n    <div>\n      \n      <networkGraph></networkGraph>\n      <descriptiveInfo></descriptiveInfo>\n      <successBarChart></successBarChart>\n      <latencyLineGraph></latencyLineGraph>\n    </div>\n  ",
            directives: [successBarChart_graph_1.successBarChart, latencyLineGraph_graph_1.latencyLineGraph, descriptiveInfo_info_1.descriptiveInfo, networkGraph_graph_1.networkGraph],
            providers: [graphs_service_1.GraphsService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [graphs_service_1.GraphsService])
    ], Graphs);
    return Graphs;
}());
exports.Graphs = Graphs;
// var summaryData = {
//     latency: [0, 1, 2, 4, 1], 
//     averageLat: 2, 
//     minLat: 0, 
//     maxLat: 2, 
//     latStdDev: .2,
//     numSuccess: 100, 
//     numFailures: 0, 
//     totalReqs: 100
// };
//graph to visualize load balancer to server interactions somehow..
//bar chart for success//failures
//summary latency stats at top.
//line chart to view all latencies
//# sourceMappingURL=graphs.component.js.map