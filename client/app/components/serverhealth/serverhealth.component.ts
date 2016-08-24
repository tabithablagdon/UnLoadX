import { Component, Input, OnInit } from '@angular/core';
import { serverHealthChart } from '../graphs/serverHealthChart/serverhealthchart.component';

@Component({
  selector: 'server-health',
  templateUrl: './client/app/components/serverhealth/serverhealth.component.html',
  styleUrls: ['./client/app/components/serverhealth/serverhealth.component.css'],
  directives: [serverHealthChart]
})

export class ServerHealthComponent {
  @Input() requestData: any;

  constructor() {}

}
