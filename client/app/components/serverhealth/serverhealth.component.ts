import { Component, Input, OnInit } from '@angular/core';
import { serverHealthChart } from '../graphs/serverHealthChart/serverhealthchart.component';
import { ServerStatsComponent } from '../graphs/server-stats/server-stats.component';

@Component({
  selector: 'server-health',
  templateUrl: './client/app/components/serverhealth/serverhealth.component.html',
  styleUrls: ['./client/app/components/serverhealth/serverhealth.component.css'],
  directives: [serverHealthChart, ServerStatsComponent]
})

export class ServerHealthComponent implements OnInit {
  @Input() requestData: any;
  serverData;

  constructor() {}

  ngOnInit() {
    this.serverData = this.requestData.serverhealth;
  }

}
