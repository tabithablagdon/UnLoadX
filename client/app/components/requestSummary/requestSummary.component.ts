import { Component, Input } from '@angular/core';
import { statusCodeBar} from '../graphs/statusCodeBar/statusCodeBar.graph';
import { descriptiveInfo } from '../graphs/descriptiveInfo/descriptiveInfo.info';

@Component({
  selector: 'request-summary',
  templateUrl: './client/app/components/requestsummary/requestsummary.component.html',
  styleUrls: ['./client/app/components/requestsummary/requestsummary.component.css'],
  directives: [statusCodeBar, descriptiveInfo]
})

export class RequestSummaryComponent {
  @Input() requestData: any;

  constructor() {

  }

}
