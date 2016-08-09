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
var form_component_1 = require('./form/form.component');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "<h1 [style.color]=\"'orange'\">UnLoadX </h1>\n              <my-form></my-form>",
            directives: [form_component_1.FormComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
// bootstrap(AppComponent);
// <h1 class="title"> Angular 2 + d3</h1>
// <bar-graph
//   bind-data="graphData"
//   width="900"
//   height="1000"
// >
// </bar-graph>
// directives: [FormComponent, BarGraph]
// constructor() {
//    this.graphData = [10, 20, 30, 40, 60];
//  } 
//# sourceMappingURL=app.component.js.map