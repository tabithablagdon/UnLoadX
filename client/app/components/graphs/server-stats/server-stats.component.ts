import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'server-stats',
  templateUrl: './client/app/components/graphs/server-stats/server-stats.component.html',
  styleUrls: ['./client/app/components/graphs/server-stats/server-stats.component.css']
})

export class ServerStatsComponent implements OnInit {
  @Input() serverData: any;
  memory;
  cpu;
  ip;

  constructor() {}

  ngOnInit() {
    this.memory = this.convertToPercent(this.serverData.memory);
    this.cpu = this.convertToPercent(this.serverData.CPU);
    this.ip = this.serverData.NodeServer.ip;
  }

  convertToPercent(num) {
    return Number((num * 100).toFixed(2));
  }

}
