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
var router_1 = require('@angular/router');
var auth_service_1 = require('../authentication/auth.service');
var AppComponent = (function () {
    function AppComponent(auth) {
        this.auth = auth;
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './client/app/components/app.component.html',
            styles: ["\n    img {\n      max-width: 60;\n      vertical-align: sub;\n    }\n    .main-logo {\n      color: orange;\n      font-size: 4em;\n      font-weight: 400;\n    }\n    .main-nav {\n      float: right;\n    }\n  "],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [auth_service_1.Auth]
        }), 
        __metadata('design:paramtypes', [auth_service_1.Auth])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//   <div class="navbar-header">
// <a class="navbar-brand" href="#">Auth0 - Angular 2</a>
// <button class="btn btn-primary btn-margin" (click)="auth.login()" *ngIf="!auth.authenticated()">Log In</button>
// <button class="btn btn-primary btn-margin" (click)="auth.logout()" *ngIf="auth.authenticated()">Log Out</button>
//   </div>
//   <header>
//         <div class="main-nav">
//           <a routerLink="/"><button class="btn waves-effect waves-light orange">Home</button></a>
//         </div>
//         <span class="main-logo">UnLoadX</span><img src="https://cdn4.iconfinder.com/data/icons/orb/128/7.png"/>
//       </header>
//       <main>
//       </main>
//       <router-outlet></router-outlet>
//# sourceMappingURL=app.component.js.map