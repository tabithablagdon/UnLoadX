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
var common_1 = require('@angular/common');
var descriptiveInfo = (function () {
    function descriptiveInfo() {
    }
    descriptiveInfo.prototype.ngOnInit = function () {
        this.parsedData = this.requestData;
        this.totalReqs = this.requestData.totalReqs;
        this.latencyAvg = this.requestData.latency.avg;
        this.latencyMin = this.requestData.latency.min;
        this.latencyMax = this.requestData.latency.max;
        this.latencyStdDev = this.requestData.latency.stdDev;
        this.summarizeStatusCodes(this.requestData.status);
    };
    descriptiveInfo.prototype.summarizeStatusCodes = function (statusCodeArray) {
        this.statusCodeCounts = {};
        for (var i = 0; i < statusCodeArray.length; i++) {
            this.statusCodeCounts[statusCodeArray[i].key] = statusCodeArray[i].values[0].value;
        }
        this.calculateSuccessRate(this.statusCodeCounts[200]);
    };
    descriptiveInfo.prototype.calculateSuccessRate = function (successes) {
        this.successRate = successes ? (successes / this.totalReqs) : 0;
    };
    descriptiveInfo.prototype.keys = function () {
        return Object.keys(this.statusCodeCounts);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], descriptiveInfo.prototype, "requestData", void 0);
    descriptiveInfo = __decorate([
        core_1.Component({
            selector: 'descriptiveInfo',
            templateUrl: './client/app/components/graphs/descriptiveInfo/descriptiveInfo.component.html',
            styleUrls: ['./client/app/components/graphs/descriptiveInfo/descriptiveInfo.component.css'],
            directives: [common_1.NgStyle]
        }), 
        __metadata('design:paramtypes', [])
    ], descriptiveInfo);
    return descriptiveInfo;
}());
exports.descriptiveInfo = descriptiveInfo;
//# sourceMappingURL=descriptiveInfo.info.js.map