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
var forms_2 = require('@angular/forms');
var ipPort_1 = require('./ipPort');
var form_service_1 = require('./formServices/form.service');
var http_1 = require('@angular/http');
var FormComponent = (function () {
    function FormComponent(_FormService) {
        this._FormService = _FormService;
        this.types = ['web server', 'image processor', 'other'];
        this.type = 'other';
        this.model = new ipPort_1.ipPort('123.456.789', '8080', 'web processor');
        this.submitted = false;
    } // form builder simplify form initialization
    FormComponent.prototype.onSubmit = function () {
        console.log(this.model);
        this._FormService.sendTest(this.model);
    };
    FormComponent.prototype.onChange = function (value) {
        this.type = value;
        this.model.type = value;
    };
    FormComponent = __decorate([
        core_1.Component({
            selector: 'my-form',
            templateUrl: "./client/app/components/form/form.component.html",
            directives: [forms_2.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES],
            providers: [form_service_1.FormService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [form_service_1.FormService])
    ], FormComponent);
    return FormComponent;
}());
exports.FormComponent = FormComponent;
//# sourceMappingURL=form.component.js.map