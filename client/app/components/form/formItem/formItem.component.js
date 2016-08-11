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
var ipPort_1 = require('../../types/ipPort');
var form_service_1 = require('../formServices/form.service');
var http_1 = require('@angular/http');
var FormItemComponent = (function () {
    function FormItemComponent(_FormService) {
        this._FormService = _FormService;
        this.model = new ipPort_1.ipPort('', '', '');
        this.formAdded = false;
    }
    // Created a new form the first time the function is called
    FormItemComponent.prototype.onChange = function () {
        if (!(this.formAdded)) {
            this._FormService.addFormItem();
            this.formAdded = true;
        }
    };
    FormItemComponent = __decorate([
        core_1.Component({
            selector: 'form-item',
            templateUrl: './client/app/components/form/formItem/formItem.component.html',
            directives: [forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES],
            providers: [form_service_1.FormService, http_1.HTTP_PROVIDERS],
        }), 
        __metadata('design:paramtypes', [form_service_1.FormService])
    ], FormItemComponent);
    return FormItemComponent;
}());
exports.FormItemComponent = FormItemComponent;
//# sourceMappingURL=formItem.component.js.map