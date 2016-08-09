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
                height: 200,
                width: (function () { return nv.utils.windowSize().width; })(),
                margin: { top: 20, right: 20, bottom: 20, left: 20 },
                color: function (d) {
                    return color(d.group);
                },
                nodeExtras: function (node) {
                    node && node
                        .append("text")
                        .attr("dx", 8)
                        .attr("dy", ".35em")
                        .text(function (d) { return d.name; })
                        .style('font-size', '10px');
                }
            }
        };
        this.data = { "nodes": [
                { "name": "Load Balancer", "group": 1 },
                { "name": "Client", "group": 2 },
                { "name": "Server 1", "group": 3 },
                { "name": "Server 2", "group": 3 }
            ],
            "links": [
                { "source": 1, "target": 0, "value": 1 },
                { "source": 2, "target": 0, "value": 2 },
                { "source": 3, "target": 0, "value": 2 }
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
            template: "\n    <h3 [style.color]=\"'blue'\"> Network View </h3>\n    <div>\n      <nvd3 [options]=\"options\" [data]=\"data\"></nvd3>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], networkGraph);
    return networkGraph;
}());
exports.networkGraph = networkGraph;
// forceDirectedGraph: {
//     "nodes":[
//       {"name":"Myriel","group":1},
//       {"name":"Napoleon","group":1},
//       {"name":"Mlle.Baptistine","group":1},
//       {"name":"Mme.Magloire","group":1},
//       {"name":"CountessdeLo","group":1},
//       {"name":"Geborand","group":1},
//       {"name":"Champtercier","group":1},
//       {"name":"Cravatte","group":1},
//       {"name":"Count","group":1},
//       {"name":"OldMan","group":1},
//       {"name":"Labarre","group":2},
//       {"name":"Valjean","group":2},
//       {"name":"Marguerite","group":3},
//       {"name":"Mme.deR","group":2},
//       {"name":"Isabeau","group":2},
//       {"name":"Woman1","group":2},
//       {"name":"Judge","group":2},
//       {"name":"Champmathieu","group":2},
//       {"name":"Brevet","group":2},
//       {"name":"Chenildieu","group":2},
//       {"name":"Cochepaille","group":2},
//       {"name":"Pontmercy","group":4},
//       {"name":"Boulatruelle","group":6},
//       {"name":"Eponine","group":4},
//       {"name":"Anzelma","group":4}
//     ],
//     "links":[
//       {"source":1,"target":0,"value":1},
//       {"source":2,"target":0,"value":8},
//       {"source":3,"target":0,"value":10},
//       {"source":3,"target":2,"value":6},
//       {"source":4,"target":0,"value":1},
//       {"source":76,"target":62,"value":1},
//       {"source":76,"target":48,"value":1},
//       {"source":76,"target":58,"value":1}
//     ]
//   }
// } 
//# sourceMappingURL=networkGraph.graph.js.map