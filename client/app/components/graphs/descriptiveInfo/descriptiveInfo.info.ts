import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'descriptiveInfo',
  template: `
    <h5 [style.color]="'orange'"> Summary Statistics </h5>
    <!--<ul>
      <li>Total Requests: {{totalReqs}}</li>
      <li>Success Rate: {{successRate | percent: '3.2-2'}}</li>
      <li>Latency per request (in ms)<br>
        - Avg: {{latencyAvg | number : '1.2-5'}} <br>
        - Min: {{latencyMin | number : '1.2-5'}} <br>
        - Max: {{latencyMax | number : '1.2-5'}} <br>
        - Std. Dev: {{latencyStdDev | number : '1.2-5'}}</li>
      <li></li>
    </ul> -->
    <table class="highlight">
        <thead>
          <tr>
            <th data-field="stat">STATISTIC</th>
            <th data-field="result">RESULT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Total Requests</strong></td>
            <td>{{totalReqs}}</td>
          </tr>
          <tr>
            <td><strong>Request Success Rate</strong></td>
            <td>{{successRate | percent: '3.2-2'}}</td>
          </tr>
          <tr>
            <td colspan="2"><strong>Latency/Request (ms)</strong></td>
          </tr>
          <tr>
            <td>Average</td>
            <td>{{latencyAvg | number : '1.2-5'}}</td>
          </tr>
          <tr>
            <td>Min</td>
            <td>{{latencyMin | number : '1.2-5'}}</td>
          </tr>
          <tr>
            <td>Max</td>
            <td>{{latencyMax | number : '1.2-5'}}</td>
          </tr>
          <tr>
            <td>Std. Dev</td>
            <td>{{latencyStdDev | number : '1.2-5'}}</td>
          </tr>
        </tbody>
      </table>
  `,
   styles: [`
     table {
       color: #FFF;
       font-size: 1.2em;
       font-weight: 500;
       border: 1px solid #FFF;
       width: 70%;
     }
     th {
       background-color: orange;
     }
     tr, td {
       padding: 1em;
     }
   `],
   directives: [NgStyle],
   providers: []
})

export class descriptiveInfo implements OnInit {
  parsedData;
  totalReqs;
  latencyAvg;
  latencyMax;
  latencyMin;
  latencyStdDev;
  statusCodeCounts;
  successRate;

  @Input () requestData: any;
  @Output () dataReceived = new EventEmitter();
  constructor () {}

  ngOnInit() {
   this.parsedData = JSON.parse(this.requestData);
   this.totalReqs = this.parsedData.totalReqs
   this.latencyAvg = this.parsedData.latency.avg;
   this.latencyMin = this.parsedData.latency.min;
   this.latencyMax = this.parsedData.latency.max;
   this.latencyStdDev = this.parsedData.latency.stdDev;
   this.summarizeStatusCodes(this.parsedData.status);
  }

  summarizeStatusCodes(statusCodeArray) {

   this.statusCodeCounts = {};

   for (let i=0; i < statusCodeArray.length; i++) {
     this.statusCodeCounts[statusCodeArray[i].key] = statusCodeArray[i].values[0].value;
   }

   this.calculateSuccessRate(this.statusCodeCounts[200]);
  }

  calculateSuccessRate (successes) {
   this.successRate = successes / this.totalReqs;
  }

  keys() : Array<string> {
    return Object.keys(this.statusCodeCounts);
  }

// [{"key":"200","values":[{"label":"Status Code","value":460}]},...]


}
