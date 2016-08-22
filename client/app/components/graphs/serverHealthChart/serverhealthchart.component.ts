import {Component, Input, ViewChild, OnInit} from '@angular/core';
import {nvD3} from '.././ng2-nvd3/lib/ng2-nvd3';
declare let d3: any;

@Component({
  selector: 'serverHealthChart',
  templateUrl: './client/app/components/graphs/serverHealthChart/serverhealthchart.component.html',
  styleUrls: ['./client/app/components/graphs/serverHealthChart/serverhealthchart.css'],
  directives: [nvD3]
})

export class serverHealthChart implements OnInit{
  options;
  data;
  serverHealthData;
  values;
  @Input() requestData: any;
  @ViewChild(nvD3)
  nvD3: nvD3;

  constructor() {
  }

  ngOnInit(){
    this.values = this.parseData(this.requestData.serverhealth);
    console.log('values', this.values);
    this.options = {
      chart: {
        type: 'discreteBarChart',
        height: 300,
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
          axisLabel: 'Servers'
        },
        yAxis: {
          axisLabel: 'GHz',
          axisLabelDistance: -10
        }
      }
    };

    this.data = [
      {
        key: "Cumulative Return",
        values: this.values
      }
    ];
  }

  parseData(serverHealthData) {

    return serverHealthData.reduce((serverHealthArray, serverHealth) => {
      let CPU = {
        "label": `CPU (GHz): ${serverHealth.NodeServer.ip}`,
        "value": serverHealth.CPU
      };
      let memory = {
        "label": `Memory (GB): ${serverHealth.NodeServer.ip}`,
        "value": serverHealth.memory
      };

      serverHealthArray.push(CPU, memory);
      return serverHealthArray;

    }, []);

  }

  ngAfterViewInit() {
    this.nvD3.chart.update()
  }

}
