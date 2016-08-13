import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class GraphsService {

  requestData;
  
  // uriPath = '/api/request/1'; //will also need testID

  constructor(private _http: Http) {}

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  getRequests () {
    console.log('yo2');
    // return this._http.get(this.uriPath)
    // .toPromise()
    // .then(this.extractData)
    // .catch(err => {
    //   console.error(err);
    //   return Promise.reject('Post Failed');
    // })
    // return this._http.get('/api/request/1')
    //       .map(res => res)
    //       .subscribe(requests => {
    //         this.requestData = requests._body;
    //         console.log('req', requests);
    //       });
          
  }
}