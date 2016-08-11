import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ipPort } from '../../types/ipPort';


@Injectable()
export class FormService {

  uriPath = '/api/nodeserver';

  constructor(private _http: Http) {}
  servers = [new ipPort(null, null, null)];
  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  sendTest(object) {
    console.log(object);
    return this._http.post(this.uriPath, object)
    .toPromise()
    .then(this.extractData)
    .catch(err => {
      console.error(err);
      return Promise.reject('Post Failed');
    })
  }

  addFormItem() {
    this.servers.push(new ipPort(null, null, null));
    console.log(this.servers);
  }
}
