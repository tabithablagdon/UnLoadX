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
        this.dataReceived = new core_1.EventEmitter();
    }
    descriptiveInfo.prototype.ngOnInit = function () {
        this.parsedData = this.requestData;
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
        this.successRate = successes ? (successes / this.totalReqs) : 0;
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
            templateUrl: './client/app/components/graphs/descriptiveInfo/descriptiveInfo.component.html',
            styles: ["\n     table {\n       color: #FFF;\n       font-size: 1.2em;\n       font-weight: 500;\n       border: 1px solid #FFF;\n       width: 70%;\n     }\n     th {\n       background-color: orange;\n     }\n     tr, td {\n       padding: 1em;\n     }\n   "],
            directives: [common_1.NgStyle]
        }), 
        __metadata('design:paramtypes', [])
    ], descriptiveInfo);
    return descriptiveInfo;
}());
exports.descriptiveInfo = descriptiveInfo;
//# sourceMappingURL=descriptiveInfo.info.js.map