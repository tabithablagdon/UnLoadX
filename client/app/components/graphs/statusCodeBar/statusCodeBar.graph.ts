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
        height: 250,
        donut: true,
        x: function(d){return d.key;},
        y: function(d){return d.y;},
        showLabels: true,
        pie: {
          startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
          endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
        },
        duration: 500,
        legend: {
          margin: {
            top: 5,
            right: 140,
            bottom: 5,
            left: 0
          }
        }
      }
    }
    // this.data = this.parsedData.status;
    this.data = this.requestData.status || [
      {
        key: "Status Code 200",
        y: 125
      },
      {
        key: "Status Code 400",
        y: 25
      }
    ];
  }

  ngAfterViewInit() {
    this.nvD3.chart.update()
  }

}
