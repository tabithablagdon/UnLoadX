import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ipPort } from '../../types/ipPort';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';


@Injectable()
export class FormService {

  constructor(private _http: Http) {
  }
  uriPath = '/api/nodeserver';

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
}
