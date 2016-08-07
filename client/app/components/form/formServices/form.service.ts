import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class FormService {
	
  uriPath = '/api/nodeserver';

  constructor(private _http: Http) {}

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  sendTest (object) {
  	return this._http.post(this.uriPath, object)
  	.toPromise()
    .then(this.extractData)
    .catch(err => {
      console.error(err);
      return Promise.reject('Post Failed');
    })
  }

 

}