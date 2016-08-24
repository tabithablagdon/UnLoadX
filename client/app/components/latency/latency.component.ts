import { Component, Input, OnInit } from '@angular/core';
import { latencyLineGraph } from '../graphs/latencyLineGraph/latencyLineGraph.graph';


@Component({
  selector: 'latency',
  templateUrl: './client/app/components/latency/latency.component.html',
  styleUrls: ['./client/app/components/latency/latency.component.css'],
  directives: [latencyLineGraph]
})

export class LatencyComponent implements OnInit {
  @Input() requestData: any;
  latencyAvg;
  latencyMax;
  latencyMin;
  latencyStdDev;

  constructor() {}

  ngOnInit() {
    this.latencyAvg = this.requestData.latency.avg.toFixed(2);
    this.latencyMin = this.requestData.latency.min;
    this.latencyMax = this.requestData.latency.max;
    this.latencyStdDev = this.requestData.latency.stdDev.toFixed(2);
  }
}
