import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class GraphsService {
  
  uriPath = '/api/requests'; //will also need testID

  constructor(private _http: Http) {}

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  getSummaryTestInfo () {
    return this._http.get(this.uriPath)
    .toPromise()
    .then(this.extractData)
    .catch(err => {
      console.error(err);
      return Promise.reject('Post Failed');
    })
  }
}