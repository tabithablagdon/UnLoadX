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
var auth_service_1 = require('../authentication/auth.service');
var EnableButtonDirective = (function () {
    function EnableButtonDirective(el, Auth, renderer) {
        var _this = this;
        this.Auth = Auth;
        this.lb = Auth.lbStatus;
        console.log(this.lb);
        this._subscription = Auth.lbUp.subscribe(function (val) {
            _this.lb = val;
            console.log('event detected from directive');
            console.log(el.nativeElement);
            console.log(el.nativeElement.style);
            el.nativeElement.style.disabled = 'true';
        });
    }
    EnableButtonDirective = __decorate([
        core_1.Directive({ selector: '[btnEnable]' }), 
        __metadata('design:paramtypes', [core_1.ElementRef, auth_service_1.Auth, core_1.Renderer])
    ], EnableButtonDirective);
    return EnableButtonDirective;
}());
exports.EnableButtonDirective = EnableButtonDirective;
//# sourceMappingURL=enable.directive.js.map