import { Component, Input } from '@angular/core';
import { latencyLineGraph } from '../graphs/latencyLineGraph/latencyLineGraph.graph';


@Component({
  selector: 'latency',
  templateUrl: './client/app/components/latency/latency.component.html',
  styleUrls: ['./client/app/components/latency/latency.component.css'],
  directives: [latencyLineGraph]
})

export class LatencyComponent {
  @Input() requestData: any;

  constructor() {

  }

}
