import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class FormService {
	
	uriPath = 'api/nodeserver';

		constructor(private _http: Http) {

	}

	sendTest (object) {
		return this._http.post(this.uriPath, JSON.stringify(object))
		.map(testResult => testResult.json());
	}

}