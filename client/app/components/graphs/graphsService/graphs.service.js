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
require('rxjs/add/operator/map');
var GraphsService = (function () {
    // uriPath = '/api/request/1'; //will also need testID
    function GraphsService(_http) {
        this._http = _http;
    }
    GraphsService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    GraphsService.prototype.getRequests = function () {
        console.log('yo2');
        // return this._http.get(this.uriPath)
        // .toPromise()
        // .then(this.extractData)
        // .catch(err => {
        //   console.error(err);
        //   return Promise.reject('Post Failed');
        // })
        // return this._http.get('/api/request/1')
        //       .map(res => res)
        //       .subscribe(requests => {
        //         this.requestData = requests._body;
        //         console.log('req', requests);
        //       });
    };
    GraphsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GraphsService);
    return GraphsService;
}());
exports.GraphsService = GraphsService;
//# sourceMappingURL=graphs.service.js.map