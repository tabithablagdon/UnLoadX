import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {nvD3} from '.././ng2-nvd3/lib/ng2-nvd3';
declare let d3, nv: any;
 
@Component({
  selector: 'networkGraph',
  directives: [nvD3],
  template: `
    <h3 [style.color]="'blue'"> Network View </h3>
    <div>
      <nvd3 [options]="options" [data]="data"></nvd3>
    </div>
  `
})
 
export class networkGraph implements OnInit{
  options;
  data;
  @ViewChild(nvD3)
  nvD3: nvD3;
  ngOnInit(){
    const color = d3.scale.category20();
    this.options = {
      chart: {
      type: 'forceDirectedGraph',
      height: 200,
      width: (function(){ return nv.utils.windowSize().width })(),
      margin:{top: 20, right: 20, bottom: 20, left: 20},
      color: function(d){
        return color(d.group)
      },
      nodeExtras: function(node) {
        node && node
          .append("text")
          .attr("dx", 8)
          .attr("dy", ".35em")
          .text(function(d) { return d.name })
          .style('font-size', '10px');
      }
    }

    }
    this.data = { "nodes": [
            {"name":"Load Balancer","group":1},
            {"name":"Client","group":2},
            {"name":"Server 1","group":3},
            {"name":"Server 2","group":3}
          
          ],
          "links":[
            {"source":1,"target":0,"value":1},
            {"source":2,"target":0,"value":2},
            {"source":3,"target":0,"value":2}
           
      ]
    };
  }

 
}





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