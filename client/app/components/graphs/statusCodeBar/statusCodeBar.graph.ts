import {Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {nvD3} from '.././ng2-nvd3/lib/ng2-nvd3';
declare let d3: any;

@Component({
  selector: 'statusCodeBar',
  directives: [nvD3],
  templateUrl: './client/app/components/graphs/statusCodeBar/statusCodeBar.component.html'
})

export class statusCodeBar implements OnInit{
  options;
  data;
  parsedData;
  @Input () requestData: any;
  @Output () dataReceived = new EventEmitter();
  constructor () {}
  @ViewChild(nvD3)
  nvD3: nvD3;
  ngOnInit(){
    this.options = {
      chart: {
        type: 'pieChart',
        height: 170,
        x: function(d){return d.key;},
        y: function(d){return d.y;},
        showLabels: true,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: {
          margin: {
            top: 5,
            right: 35,
            bottom: 5,
            left: 0
          }
        }
      }
    }
    // this.data = this.requestData.status;
    this.data = this.requestData.status || [
      {
        key: "Status Code 200",
        y: 125,
        color: 'orange'
      },
      {
        key: "Status Code 400",
        y: 25,
        color: 'red'
      }
    ];
  }

  ngAfterViewInit() {
    this.nvD3.chart.update()
  }

}
