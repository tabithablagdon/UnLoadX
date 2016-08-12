"use strict";
var form_component_1 = require('./form/form.component');
var formItem_component_1 = require('./form/formItem/formItem.component');
var graphs_component_1 = require('./graphs/graphs.component');
exports.appRoutes = [
    { path: '', component: form_component_1.FormComponent },
    { path: 'item', component: formItem_component_1.FormItemComponent },
    { path: 'graphs', component: graphs_component_1.Graphs }
];
//# sourceMappingURL=app.routing.js.map