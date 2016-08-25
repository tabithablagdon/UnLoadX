import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {nvD3} from '.././ng2-nvd3/lib/ng2-nvd3';
declare let d3, nv: any;


@Component({
  selector: 'networkGraph',
  directives: [nvD3],
  templateUrl: './client/app/components/graphs/networkGraph/networkGraph.component.html'
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
      height: 400,
      width: 600,
      margin:{top: 20, right: 20, bottom: 20, left: 0},
      radius: 15,
      linkDist:400,
      color: function(d){
        return color(d.group)
      },
      nodeExtras: function(node) {
        node && node
          .append("text")
          .attr("dx", 20)
          .attr("dy", ".35em")
          .text(function(d) { return d.name })
          .style('font-size', '15px')
          .style('fill', 'white');

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
            {"source":1,"target":0,"value":10},
            {"source":2,"target":0,"value":2},
            {"source":3,"target":0,"value":2}

      ]
    };
  }


}




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



  // this.data = { "nodes": [
  //           {"name":"Load Balancer","group":1},
  //           {"name":"Client","group":2},
  //           {"name":"API Server","group":3},
  //           {"name":"Siege Microservice","group":4},
  //           {"name":"Postgres Database","group":5},
  //           {"name":"Server 1","group":6},
  //           {"name":"Server 2","group":6}


  //         ],
  //         "links":[
  //           {"source":0,"target":2,"value":10}, //LB-API Server
  //           {"source":1,"target":2,"value":2}, //Client-API Server
  //           {"source":3,"target":2,"value":2}, //Siege Microservice-API Server
  //           {"source":4,"target":2,"value":2}, //PostGres-API Server
  //           {"source":5,"target":0,"value":5}, //Server1 to LB
  //           {"source":6,"target":0,"value":5}, //Server2 to LB
  //           {"source":3,"target":0,"value":2}, //Siege to LB
  //           {"source":3,"target":4,"value":2}  //Siege to Postgres
