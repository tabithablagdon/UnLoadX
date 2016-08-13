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
var ng2_nvd3_1 = require('.././ng2-nvd3/lib/ng2-nvd3');
var networkGraph = (function () {
    function networkGraph() {
    }
    networkGraph.prototype.ngOnInit = function () {
        var color = d3.scale.category20();
        this.options = {
            chart: {
                type: 'forceDirectedGraph',
                height: 500,
                width: 1000,
                margin: { top: 20, right: 20, bottom: 20, left: 20 },
                radius: 15,
                linkDist: 450,
                color: function (d) {
                    return color(d.group);
                },
                nodeExtras: function (node) {
                    node && node
                        .append("text")
                        .attr("dx", 15)
                        .attr("dy", ".35em")
                        .text(function (d) { return d.name; })
                        .style('font-size', '15px');
                }
            }
        };
        this.data = { "nodes": [
                { "name": "Load Balancer", "group": 1 },
                { "name": "Client", "group": 2 },
                { "name": "API Server", "group": 3 },
                { "name": "Siege Microservice", "group": 4 },
                { "name": "Postgres Database", "group": 5 },
                { "name": "Server 1", "group": 6 },
                { "name": "Server 2", "group": 6 }
            ],
            "links": [
                { "source": 0, "target": 2, "value": 10 },
                { "source": 1, "target": 2, "value": 2 },
                { "source": 3, "target": 2, "value": 2 },
                { "source": 4, "target": 2, "value": 2 },
                { "source": 5, "target": 0, "value": 5 },
                { "source": 6, "target": 0, "value": 5 },
                { "source": 3, "target": 0, "value": 2 },
                { "source": 3, "target": 4, "value": 2 } //Siege to Postgres
            ]
        };
    };
    __decorate([
        core_1.ViewChild(ng2_nvd3_1.nvD3), 
        __metadata('design:type', ng2_nvd3_1.nvD3)
    ], networkGraph.prototype, "nvD3", void 0);
    networkGraph = __decorate([
        core_1.Component({
            selector: 'networkGraph',
            directives: [ng2_nvd3_1.nvD3],
            template: "\n    <h3 [style.color]=\"'blue'\"> Network Architecture </h3>\n    <div>\n      <nvd3 [options]=\"options\" [data]=\"data\"></nvd3>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], networkGraph);
    return networkGraph;
}());
exports.networkGraph = networkGraph;
// this.data = { "nodes": [
//             {"name":"Load Balancer","group":1},
//             {"name":"Client","group":2},
//             {"name":"Server 1","group":3},
//             {"name":"Server 2","group":3}
//           ],
//           "links":[
//             {"source":1,"target":0,"value":10},
//             {"source":2,"target":0,"value":2},
//             {"source":3,"target":0,"value":2}
//       ]
//     };
//# sourceMappingURL=networkGraph.graph.js.map