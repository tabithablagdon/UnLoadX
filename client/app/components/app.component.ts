import { Component } from '@angular/core';

export class Test {
  id: number;
  ip: string;
  port: string;
}


@Component({
  selector: 'my-app',
  template: `<h1>UnLoadX </h1>
  			<h4>Enter Server IP Address & Port Number:</h4>
  			<input [(ngModel)]="ipAddress" placeholder="IP Address">
  			<input [(ngModel)]="port" placeholder="Port">
  			<button (click)= "onClick()"> Add IP & Port </button>
  			<h4>Current List of IP Address & Port Numbers:</h4>
  			<ul>
  			<li *ngFor="let item of test"> IP:{{item.ip}} / Port: {{item.port}} <button (click)= "onRemove($index)"> Remove </button> 
  			</li>
  			</ul>
  			<input [(ngModel)]="reqNum" placeholder="Number of Requests">
  			<button (click)= "onLog()"> Submit Test </button>`
})
export class AppComponent { 


	constructor () {
	}

	onClick() {
		this.test.push({id:2, ip: this.ipAddress, port: this.port});
	}

	onRemove(num) {
		this.test.splice(num,1);
	}

	onLog() {
		console.log(this.test);
	}

	test: Test[] = [];

}
