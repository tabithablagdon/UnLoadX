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
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var ipPort_1 = require('../../types/ipPort');
var FormItemComponent = (function () {
    function FormItemComponent() {
        this.formUpdate = new core_1.EventEmitter();
        this.model = new ipPort_1.ipPort(null, null, null);
        this.formAdded = false;
    }
    // Created a new form the first time the function is called
    FormItemComponent.prototype.onChange = function () {
        if (!(this.formAdded)) {
            this.formUpdate.emit(this.model);
            this.formAdded = true;
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FormItemComponent.prototype, "formUpdate", void 0);
    FormItemComponent = __decorate([
        core_1.Component({
            selector: 'form-item',
            templateUrl: './client/app/components/form/formItem/formItem.component.html',
            directives: [forms_1.FORM_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS],
        }), 
        __metadata('design:paramtypes', [])
    ], FormItemComponent);
    return FormItemComponent;
}());
exports.FormItemComponent = FormItemComponent;
//# sourceMappingURL=formItem.component.js.map