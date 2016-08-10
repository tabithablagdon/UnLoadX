"use strict";
var form_component_1 = require('./form/form.component');
var graphs_component_1 = require('./graphs/graphs.component');
exports.appRoutes = [
    { path: '', component: form_component_1.FormComponent },
    { path: 'graphs', component: graphs_component_1.Graphs }
];
// interface Route {
//   path?: string;
//   component?: Type|string;
// } 
//# sourceMappingURL=app.routing.js.map