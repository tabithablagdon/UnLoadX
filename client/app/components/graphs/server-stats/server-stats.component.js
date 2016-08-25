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
var ServerStatsComponent = (function () {
    function ServerStatsComponent() {
    }
    ServerStatsComponent.prototype.ngOnInit = function () {
        this.memory = this.convertToPercent(this.serverData.memory);
        this.cpu = this.convertToPercent(this.serverData.CPU);
        this.ip = this.serverData.NodeServer.ip;
    };
    ServerStatsComponent.prototype.convertToPercent = function (num) {
        return Number((num * 100).toFixed(2));
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ServerStatsComponent.prototype, "serverData", void 0);
    ServerStatsComponent = __decorate([
        core_1.Component({
            selector: 'server-stats',
            templateUrl: './client/app/components/graphs/server-stats/server-stats.component.html',
            styleUrls: ['./client/app/components/graphs/server-stats/server-stats.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], ServerStatsComponent);
    return ServerStatsComponent;
}());
exports.ServerStatsComponent = ServerStatsComponent;
//# sourceMappingURL=server-stats.component.js.map