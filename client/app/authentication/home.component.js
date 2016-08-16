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
var auth_service_1 = require('./auth.service');
var HomeComponent = (function () {
    function HomeComponent(auth) {
        this.auth = auth;
    }
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            template: "\n  <strong>Address: </strong> {{auth.userProfile.user_metadata.address}}\n<div *ngIf=\"auth.authenticated() && auth.userProfile\">\n  <h4>You are logged in</h4>\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <h3>Profile</h3>\n      <img [src]=\"auth.userProfile.picture\" alt=\"\" class=\"profile-img\">\n      <p><strong>Name: </strong> {{auth.userProfile.name}}</p>\n      <p><strong>Email: </strong> {{auth.userProfile.email}}</p>\n      <p><strong>Nickname: </strong> {{auth.userProfile.nickname}}</p>\n      <p><strong>Created At: </strong> {{auth.userProfile.created_at}}</p>\n      <p><strong>Updated At: </strong> {{auth.userProfile.updated_at}}</p>\n    </div>\n  </div>\n</div>\n<h4 *ngIf=\"!auth.authenticated()\">You are not logged in, please click 'Log in' button to login</h4>\n",
            providers: [auth_service_1.Auth]
        }), 
        __metadata('design:paramtypes', [auth_service_1.Auth])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map