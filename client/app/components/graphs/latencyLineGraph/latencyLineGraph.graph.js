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
var ng2_nvd3_1 = require('.././ng2-nvd3/lib/ng2-nvd3');
var latencyLineGraph = (function () {
    function latencyLineGraph() {
    }
    latencyLineGraph.prototype.ngOnInit = function () {
        this.options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: function (d) { return d.x; },
                y: function (d) { return d.y; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function (e) { console.log("stateChange"); },
                    changeState: function (e) { console.log("changeState"); },
                    tooltipShow: function (e) { console.log("tooltipShow"); },
                    tooltipHide: function (e) { console.log("tooltipHide"); }
                },
                showValues: true,
                valueFormat: function (d) {
                    return d3.format(',.4f')(d);
                },
                duration: 500,
                xAxis: {
                    axisLabel: 'Request (across time)'
                },
                yAxis: {
                    axisLabel: 'Time Latency',
                    axisLabelDistance: -10
                }
            }
        };
        this.data = [
            {
                values: [{ x: 1, y: 2 }, { x: 2, y: 2.5 }, { x: 3, y: 5 }],
                key: 'Server 1',
                color: '#ff7f0e' //color - optional: choose your own line color.
            },
            {
                values: [{ x: 1, y: 2.5 }, { x: 2, y: 3.5 }, { x: 3, y: 2 }],
                key: 'Server 2',
                color: '#2ca02c'
            }
        ];
    };
    latencyLineGraph.prototype.ngAfterViewInit = function () {
        this.nvD3.chart.update();
    };
    __decorate([
        core_1.ViewChild(ng2_nvd3_1.nvD3), 
        __metadata('design:type', ng2_nvd3_1.nvD3)
    ], latencyLineGraph.prototype, "nvD3", void 0);
    latencyLineGraph = __decorate([
        core_1.Component({
            selector: 'latencyLineGraph',
            directives: [ng2_nvd3_1.nvD3],
            template: "\n    <div>\n      <nvd3 [options]=\"options\" [data]=\"data\"></nvd3>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], latencyLineGraph);
    return latencyLineGraph;
}());
exports.latencyLineGraph = latencyLineGraph;
//# sourceMappingURL=latencyLineGraph.graph.js.map