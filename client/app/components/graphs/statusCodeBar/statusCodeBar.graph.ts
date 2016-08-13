import {Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {nvD3} from '.././ng2-nvd3/lib/ng2-nvd3';
import {GraphsService} from '.././graphsService/graphs.service';
declare let d3: any;
 
@Component({
  selector: 'statusCodeBar',
  directives: [nvD3],
  template: `
    <h3 [style.color]="'blue'"> Status Code Breakout </h3>
    <div>
      <nvd3 [options]="options" [data]="data"></nvd3>
    </div>
  `
})
 
export class statusCodeBar implements OnInit{
  options;
  data;
  parsedData;
  @Input () requestData: any;
  @Output () dataReceived = new EventEmitter();
  constructor (private GraphsService: GraphsService) {}
  @ViewChild(nvD3)
  nvD3: nvD3;
  ngOnInit(){
    this.parsedData = JSON.parse(this.requestData);
    this.options = {
      chart: {
        type: 'multiBarChart',
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
          return d3.format(',0%')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: ''
        },
        yAxis: {
          axisLabel: '# of Status Codes',
          axisLabelDistance: -10
        }
      }
    }
    this.data = this.parsedData.status;
    // this.data = [
    //   {
    //     key: "200",
    //     values: [
    //       {
    //         "label" : "Status Code" ,
    //         "value" : 80
    //       }
    //     ]
    //   },
    //   {
    //     key: "400",
    //     values: [
    //       {
    //         "label" : "Status Code" ,
    //         "value" : 50
    //       }
    //     ]
    //   }
    // ];
  }

  ngAfterViewInit() {
      this.nvD3.chart.update()
  } 
 
}