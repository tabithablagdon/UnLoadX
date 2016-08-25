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
var statusCodeBar_graph_1 = require('../graphs/statusCodeBar/statusCodeBar.graph');
var descriptiveInfo_info_1 = require('../graphs/descriptiveInfo/descriptiveInfo.info');
var RequestSummaryComponent = (function () {
    function RequestSummaryComponent() {
    }
    RequestSummaryComponent.prototype.ngOnInit = function () {
        this.totalReqs = this.requestData.totalReqs;
        this.summarizeStatusCodes(this.requestData.status);
    };
    RequestSummaryComponent.prototype.summarizeStatusCodes = function (statusCodeArray) {
        this.statusCodeCounts = {};
        for (var i = 0; i < statusCodeArray.length; i++) {
            this.statusCodeCounts[statusCodeArray[i].key] = statusCodeArray[i].values[0].value;
        }
        this.calculateSuccessRate(this.statusCodeCounts[200]);
    };
    RequestSummaryComponent.prototype.calculateSuccessRate = function (successes) {
        this.successRate = successes ? (successes / this.totalReqs) : 0;
    };
    RequestSummaryComponent.prototype.keys = function () {
        return Object.keys(this.statusCodeCounts);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RequestSummaryComponent.prototype, "requestData", void 0);
    RequestSummaryComponent = __decorate([
        core_1.Component({
            selector: 'request-summary',
            templateUrl: './client/app/components/requestSummary/requestSummary.component.html',
            styleUrls: ['./client/app/components/requestSummary/requestSummary.component.css'],
            directives: [statusCodeBar_graph_1.statusCodeBar, descriptiveInfo_info_1.descriptiveInfo]
        }), 
        __metadata('design:paramtypes', [])
    ], RequestSummaryComponent);
    return RequestSummaryComponent;
}());
exports.RequestSummaryComponent = RequestSummaryComponent;
//# sourceMappingURL=requestSummary.component.js.map