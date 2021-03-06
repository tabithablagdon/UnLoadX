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
var latencyLineGraph_graph_1 = require('../graphs/latencyLineGraph/latencyLineGraph.graph');
var LatencyComponent = (function () {
    function LatencyComponent() {
    }
    LatencyComponent.prototype.ngOnInit = function () {
        this.latencyAvg = this.requestData.latency.avg.toFixed(2);
        this.latencyMin = this.requestData.latency.min;
        this.latencyMax = this.requestData.latency.max;
        this.latencyStdDev = this.requestData.latency.stdDev.toFixed(2);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LatencyComponent.prototype, "requestData", void 0);
    LatencyComponent = __decorate([
        core_1.Component({
            selector: 'latency',
            templateUrl: './client/app/components/latency/latency.component.html',
            styleUrls: ['./client/app/components/latency/latency.component.css'],
            directives: [latencyLineGraph_graph_1.latencyLineGraph]
        }), 
        __metadata('design:paramtypes', [])
    ], LatencyComponent);
    return LatencyComponent;
}());
exports.LatencyComponent = LatencyComponent;
//# sourceMappingURL=latency.component.js.map