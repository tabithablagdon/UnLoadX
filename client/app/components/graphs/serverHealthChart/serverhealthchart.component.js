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
var serverHealthChart = (function () {
    function serverHealthChart() {
    }
    serverHealthChart.prototype.ngOnInit = function () {
        this.values = this.parseData(this.requestData.serverhealth);
        console.log('values', this.values);
        this.options = {
            chart: {
                type: 'discreteBarChart',
                height: 220,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: function (d) { return d.label; },
                y: function (d) { return d.value; },
                showValues: true,
                valueFormat: function (d) {
                    return d3.format(',.4f')(d);
                },
                duration: 500,
                xAxis: {
                    axisLabel: 'Servers'
                },
                yAxis: {
                    axisLabel: 'GHz',
                    axisLabelDistance: -10
                }
            }
        };
        this.data = [
            {
                key: "Cumulative Return",
                values: this.values
            }
        ];
    };
    serverHealthChart.prototype.parseData = function (serverHealthData) {
        return serverHealthData.reduce(function (serverHealthArray, serverHealth) {
            var CPU = {
                "label": "CPU (GHz): " + serverHealth.NodeServer.ip,
                "value": serverHealth.CPU
            };
            var memory = {
                "label": "Memory (GB): " + serverHealth.NodeServer.ip,
                "value": serverHealth.memory
            };
            serverHealthArray.push(CPU, memory);
            return serverHealthArray;
        }, []);
    };
    serverHealthChart.prototype.ngAfterViewInit = function () {
        this.nvD3.chart.update();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], serverHealthChart.prototype, "requestData", void 0);
    __decorate([
        core_1.ViewChild(ng2_nvd3_1.nvD3), 
        __metadata('design:type', ng2_nvd3_1.nvD3)
    ], serverHealthChart.prototype, "nvD3", void 0);
    serverHealthChart = __decorate([
        core_1.Component({
            selector: 'serverHealthChart',
            templateUrl: './client/app/components/graphs/serverHealthChart/serverhealthchart.component.html',
            styleUrls: ['./client/app/components/graphs/serverHealthChart/serverhealthchart.css'],
            directives: [ng2_nvd3_1.nvD3]
        }), 
        __metadata('design:paramtypes', [])
    ], serverHealthChart);
    return serverHealthChart;
}());
exports.serverHealthChart = serverHealthChart;
//# sourceMappingURL=serverhealthchart.component.js.map