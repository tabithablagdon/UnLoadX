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
var FormComponent = (function () {
    function FormComponent() {
        this.test = [];
    }
    FormComponent.prototype.onClick = function () {
        this.test.push({ id: 2, ip: this.ipAddress, port: this.port });
    };
    FormComponent.prototype.onRemove = function (num) {
        this.test.splice(num, 1);
    };
    FormComponent.prototype.onLog = function () {
        console.log(this.test);
    };
    FormComponent = __decorate([
        core_1.Component({
            selector: 'my-form',
            template: "<h1 [style.color]=\"'orange'\">UnLoadX </h1>\n  \t\t\t<h4>Enter Server IP Address & Port Number:</h4>\n  \t\t\t<input [(ngModel)]=\"ipAddress\" placeholder=\"IP Address\">\n  \t\t\t<input [(ngModel)]=\"port\" placeholder=\"Port\">\n        <button (click)= \"onClick()\"> Add IP/Port </button>\n  \t\t\n  \t\t\t<h4>Current List of IP Address & Port Numbers:</h4>\n  \t\t\t<ul>\n  \t\t\t<li *ngFor=\"let item of test\"> IP:{{item.ip}} / Port: {{item.port}} <button (click)= \"onRemove($index)\"> Remove </button> \n  \t\t\t</li>\n  \t\t\t</ul>\n  \t\t\t<input [(ngModel)]=\"reqNum\" placeholder=\"Number of Requests\">\n  \t\t\t<button (click)= \"onLog()\"> Submit Test </button>"
        }), 
        __metadata('design:paramtypes', [])
    ], FormComponent);
    return FormComponent;
}());
exports.FormComponent = FormComponent;
//# sourceMappingURL=form.component.js.map