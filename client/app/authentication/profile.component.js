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
var angular2_jwt_1 = require('angular2-jwt');
var core_1 = require('@angular/core');
var auth_service_1 = require('./auth.service');
var router_1 = require('@angular/router');
var ProfileEdit = (function () {
    function ProfileEdit(auth, authHttp, router) {
        this.auth = auth;
        this.authHttp = authHttp;
        this.router = router;
        if (auth.userProfile.user_metadata && auth.userProfile.user_metadata.address) {
            this.address = auth.userProfile.user_metadata.address;
        }
    }
    ProfileEdit.prototype.onSubmit = function () {
        var _this = this;
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        var data = JSON.stringify({
            user_metadata: {
                address: this.address
            }
        });
        this.authHttp
            .patch('https://' + 'jamesramadan.auth0.com' + '/api/v2/users/' + this.auth.userProfile.user_id, data, { headers: headers })
            .map(function (response) { return response.json(); })
            .subscribe(function (response) {
            //Update profile
            _this.auth.userProfile = response;
            localStorage.setItem('profile', JSON.stringify(response));
            _this.router.navigate(['/Profile']);
        }, function (error) { return alert(error.json().message); });
    };
    ProfileEdit = __decorate([
        core_1.Component({
            selector: 'profile',
            template: "\n\n<div class=\"row\">\n            <div class=\"col-md-6\">\n              <h3>Profile</h3>\n              <img [src]=\"auth.userProfile.picture\" alt=\"\" class=\"profile-img\">\n              <form (ngSubmit)=\"onSubmit()\">\n                <div class=\"form-group\">\n                  <label for=\"name\">Address</label>\n                  <input type=\"text\" class=\"form-control\" [(ngModel)]=\"address\" placeholder=\"Enter address\">\n                </div>\n                <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n              </form>\n            </div>\n          </div>\n          ",
            providers: [auth_service_1.Auth, router_1.Router, angular2_jwt_1.AuthHttp]
        }), 
        __metadata('design:paramtypes', [auth_service_1.Auth, angular2_jwt_1.AuthHttp, router_1.Router])
    ], ProfileEdit);
    return ProfileEdit;
}());
exports.ProfileEdit = ProfileEdit;
//# sourceMappingURL=profile.component.js.map