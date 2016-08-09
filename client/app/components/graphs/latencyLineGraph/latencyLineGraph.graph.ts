import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {nvD3} from '.././ng2-nvd3/lib/ng2-nvd3';
declare let d3: any;
 
@Component({
  selector: 'latencyLineGraph',
  directives: [nvD3],
  template: `
    <h3 [style.color]="'blue'"> Latency over Time (by Server) </h3>
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
        type: 'lineChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: function(d){ return d.x; },
        y: function(d){ return d.y; },
        useInteractiveGuideline: true,
        dispatch: {
                stateChange: function(e){ console.log("stateChange"); },
                changeState: function(e){ console.log("changeState"); },
                tooltipShow: function(e){ console.log("tooltipShow"); },
                tooltipHide: function(e){ console.log("tooltipHide"); }
        },
        showValues: true,
        valueFormat: function(d){
          return d3.format(',.4f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'Requests (across time)'
        },
        yAxis: {
          axisLabel: 'Time Latency (ms)',
          axisLabelDistance: -10
        }
      }
    }
    this.data = [
      {
        values: [{x:1,y:2}, {x:2,y:2.5}, {x:3, y:5}],      //values - represents the array of {x,y} data points
        key: 'Server 1', //key  - the name of the series.
        color: '#ff7f0e'  //color - optional: choose your own line color.
      },
      {
        values: [{x:1,y:2.5}, {x:2,y:3.5}, {x:3, y:2}],
        key: 'Server 2',
        color: '#2ca02c'
      }
    ];
  }

  ngAfterViewInit() {
      this.nvD3.chart.update()
  } 
 
}