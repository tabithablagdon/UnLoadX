"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var router_1 = require('@angular/router');
var app_component_1 = require('./components/app.component');
var app_routing_1 = require('./components/app.routing');
var forms_1 = require('@angular/forms');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms(),
    router_1.provideRouter(app_routing_1.appRoutes) // enable new forms module
])
    .catch(function (err) { return console.log("Error bootstrapping App " + err); });
//# sourceMappingURL=main.js.map