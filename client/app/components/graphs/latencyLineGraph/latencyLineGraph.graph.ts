import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {nvD3} from '.././ng2-nvd3/lib/ng2-nvd3';
declare let d3: any;
 
@Component({
  selector: 'latencyLineGraph',
  directives: [nvD3],
  template: `
    <div>
      <nvd3 [options]="options" [data]="data"></nvd3>
    </div>
  `
})
 
export class latencyLineGraph implements OnInit{
  options;
  data;
  @ViewChild(nvD3)
  nvD3: nvD3;
  ngOnInit(){
    this.options = {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: function(d){return d.label;},
        y: function(d){return d.value;},
        showValues: true,
        valueFormat: function(d){
          return d3.format(',.4f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'Server #'
        },
        yAxis: {
          axisLabel: 'Time Latency',
          axisLabelDistance: -10
        }
      }
    }
    this.data = [
      {
        key: "Server Latencies",
        values: [
          {
            "label" : "Server1" ,
            "value" : 29.765957771107
          } ,
          {
            "label" : "Server2" ,
            "value" : 50
          } 
        ]
      }
    ];
  }

  ngAfterViewInit() {
      this.nvD3.chart.update()
  } 
 
}