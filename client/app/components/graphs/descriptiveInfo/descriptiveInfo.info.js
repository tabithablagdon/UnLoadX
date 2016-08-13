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
var graphs_service_1 = require('.././graphsService/graphs.service');
var common_1 = require('@angular/common');
var descriptiveInfo = (function () {
    function descriptiveInfo(GraphsService) {
        this.GraphsService = GraphsService;
        this.dataReceived = new core_1.EventEmitter();
    }
    descriptiveInfo.prototype.ngOnInit = function () {
        this.parsedData = JSON.parse(this.requestData);
        this.totalReqs = this.parsedData.totalReqs;
        this.latencyAvg = this.parsedData.latency.avg;
        this.latencyMin = this.parsedData.latency.min;
        this.latencyMax = this.parsedData.latency.max;
        this.latencyStdDev = this.parsedData.latency.stdDev;
        this.summarizeStatusCodes(this.parsedData.status);
    };
    descriptiveInfo.prototype.summarizeStatusCodes = function (statusCodeArray) {
        this.statusCodeCounts = {};
        for (var i = 0; i < statusCodeArray.length; i++) {
            this.statusCodeCounts[statusCodeArray[i].key] = statusCodeArray[i].values[0].value;
        }
        this.calculateSuccessRate(this.statusCodeCounts[200]);
    };
    descriptiveInfo.prototype.calculateSuccessRate = function (successes) {
        this.successRate = successes / this.totalReqs;
    };
    descriptiveInfo.prototype.keys = function () {
        return Object.keys(this.statusCodeCounts);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], descriptiveInfo.prototype, "requestData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], descriptiveInfo.prototype, "dataReceived", void 0);
    descriptiveInfo = __decorate([
        core_1.Component({
            selector: 'descriptiveInfo',
            template: "\n    <h3 [style.color]=\"'blue'\"> Descriptive Statistics </h3>\n    <h4> Total Requests: {{totalReqs}} </h4>\n    <h4> Request Success Rate: {{successRate | percent: '3.2-2'}}  </h4>\n    <h4> Status Code Count: </h4>\n    <span [ngStyle]=\"{'font-size':20}\" *ngFor=\"let key of keys();\"> Status Code {{key}}: {{statusCodeCounts[key]}} </span>\n    <h4> Latency per request (in ms)- Avg: {{latencyAvg | number : '1.2-5'}}, Min: {{latencyMin | number : '1.2-5'}}, \n    Max: {{latencyMax | number : '1.2-5'}}, Std. Dev: {{latencyStdDev | number : '1.2-5'}} </h4>\n  ",
            directives: [common_1.NgStyle],
            providers: [graphs_service_1.GraphsService]
        }), 
        __metadata('design:paramtypes', [graphs_service_1.GraphsService])
    ], descriptiveInfo);
    return descriptiveInfo;
}());
exports.descriptiveInfo = descriptiveInfo;
//# sourceMappingURL=descriptiveInfo.info.js.map