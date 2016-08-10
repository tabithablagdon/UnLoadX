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
var descriptiveInfo = (function () {
    function descriptiveInfo() {
    }
    descriptiveInfo = __decorate([
        core_1.Component({
            selector: 'descriptiveInfo',
            directives: [],
            template: "\n    <h3 [style.color]=\"'blue'\"> Descriptive Statistics </h3>\n    <h4> Total Requests: 100 </h4>\n    <h5> <span> Server 1: 50, </span> <span> Server 2: 50 </span> </h5> \n    <h5> Request Success Rate: 85% </h5>\n    <h5> <span> Latency </span> <span> Avg: 2 ms, </span> <span> Min: 0 ms, </span> <span> Max: 3 ms, </span> \n    <span> Std Dev: .2 ms </span> </h5>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], descriptiveInfo);
    return descriptiveInfo;
}());
exports.descriptiveInfo = descriptiveInfo;
//# sourceMappingURL=descriptiveInfo.info.js.map