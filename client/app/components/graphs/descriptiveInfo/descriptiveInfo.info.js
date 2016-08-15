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
            template: "\n    <h5 [style.color]=\"'orange'\"> Summary Statistics </h5>\n    <!--<ul>\n      <li>Total Requests: {{totalReqs}}</li>\n      <li>Success Rate: {{successRate | percent: '3.2-2'}}</li>\n      <li>Latency per request (in ms)<br>\n        - Avg: {{latencyAvg | number : '1.2-5'}} <br>\n        - Min: {{latencyMin | number : '1.2-5'}} <br>\n        - Max: {{latencyMax | number : '1.2-5'}} <br>\n        - Std. Dev: {{latencyStdDev | number : '1.2-5'}}</li>\n      <li></li>\n    </ul> -->\n    <table class=\"highlight\">\n        <thead>\n          <tr>\n            <th data-field=\"stat\">STATISTIC</th>\n            <th data-field=\"result\">RESULT</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><strong>Total Requests</strong></td>\n            <td>{{totalReqs}}</td>\n          </tr>\n          <tr>\n            <td><strong>Request Success Rate</strong></td>\n            <td>{{successRate | percent: '3.2-2'}}</td>\n          </tr>\n          <tr>\n            <td colspan=\"2\"><strong>Latency/Request (ms)</strong></td>\n          </tr>\n          <tr>\n            <td>Average</td>\n            <td>{{latencyAvg | number : '1.2-5'}}</td>\n          </tr>\n          <tr>\n            <td>Min</td>\n            <td>{{latencyMin | number : '1.2-5'}}</td>\n          </tr>\n          <tr>\n            <td>Max</td>\n            <td>{{latencyMax | number : '1.2-5'}}</td>\n          </tr>\n          <tr>\n            <td>Std. Dev</td>\n            <td>{{latencyStdDev | number : '1.2-5'}}</td>\n          </tr>\n        </tbody>\n      </table>\n  ",
            styles: ["\n     table {\n       color: #FFF;\n       font-size: 1.2em;\n       font-weight: 500;\n       border: 1px solid #FFF;\n       width: 70%;\n     }\n     th {\n       background-color: orange;\n     }\n     tr, td {\n       padding: 1em;\n     }\n   "],
            directives: [common_1.NgStyle],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], descriptiveInfo);
    return descriptiveInfo;
}());
exports.descriptiveInfo = descriptiveInfo;
//# sourceMappingURL=descriptiveInfo.info.js.map