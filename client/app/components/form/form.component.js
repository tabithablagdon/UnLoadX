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
var forms_1 = require('@angular/forms');
var ipPort_1 = require('../types/ipPort');
var numReq_1 = require('../types/numReq');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var formItem_component_1 = require('./formItem/formItem.component');
var socket_service_1 = require('../socket/socket.service');
var FormComponent = (function () {
    function FormComponent(Router, SocketService) {
        this.Router = Router;
        this.SocketService = SocketService;
        this.servers = [new ipPort_1.ipPort(null, null, null)];
        this.numReqModel = new numReq_1.numReq(0);
    }
    FormComponent.prototype.onSubmit = function () {
        var models = this.formItemComponents._results.map(function (item) { return item.model; });
        models = models.slice(0, models.length - 1);
        var formData = {
            servers: models,
            volume: this.numReqModel.numReq
        };
        this.SocketService.sendServers(formData);
        this.Router.navigate(['/graphs']);
    };
    FormComponent.prototype.addFormItem = function (model) {
        this.servers.push(model);
    };
    __decorate([
        core_1.ViewChildren(formItem_component_1.FormItemComponent), 
        __metadata('design:type', Object)
    ], FormComponent.prototype, "formItemComponents", void 0);
    FormComponent = __decorate([
        core_1.Component({
            selector: 'my-form',
            templateUrl: "./client/app/components/form/form.component.html",
            directives: [forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES, formItem_component_1.FormItemComponent],
            providers: [http_1.HTTP_PROVIDERS, socket_service_1.default],
            styles: ["\n    h4 {\n      color: orange\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [router_1.Router, socket_service_1.default])
    ], FormComponent);
    return FormComponent;
}());
exports.FormComponent = FormComponent;
//# sourceMappingURL=form.component.js.map