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
var statusCodeBar = (function () {
    function statusCodeBar() {
        this.dataReceived = new core_1.EventEmitter();
    }
    statusCodeBar.prototype.ngOnInit = function () {
        this.parsedData = JSON.parse(this.requestData);
        this.options = {
            chart: {
                type: 'multiBarChart',
                height: 450,
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
                    return d3.format(',0%')(d);
                },
                duration: 500,
                xAxis: {
                    axisLabel: ''
                },
                yAxis: {
                    axisLabel: '# of Status Codes',
                    axisLabelDistance: -10
                }
            }
        };
        this.data = this.parsedData.status;
        // this.data = [
        //   {
        //     key: "200",
        //     values: [
        //       {
        //         "label" : "Status Code" ,
        //         "value" : 80
        //       }
        //     ]
        //   },
        //   {
        //     key: "400",
        //     values: [
        //       {
        //         "label" : "Status Code" ,
        //         "value" : 50
        //       }
        //     ]
        //   }
        // ];
    };
    statusCodeBar.prototype.ngAfterViewInit = function () {
        this.nvD3.chart.update();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], statusCodeBar.prototype, "requestData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], statusCodeBar.prototype, "dataReceived", void 0);
    __decorate([
        core_1.ViewChild(ng2_nvd3_1.nvD3), 
        __metadata('design:type', ng2_nvd3_1.nvD3)
    ], statusCodeBar.prototype, "nvD3", void 0);
    statusCodeBar = __decorate([
        core_1.Component({
            selector: 'statusCodeBar',
            directives: [ng2_nvd3_1.nvD3],
            template: "\n    <h5 [style.color]=\"'orange'\"> Status Code Breakdown </h5>\n    <div>\n      <nvd3 [options]=\"options\" [data]=\"data\"></nvd3>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], statusCodeBar);
    return statusCodeBar;
}());
exports.statusCodeBar = statusCodeBar;
//# sourceMappingURL=statusCodeBar.graph.js.map