import { AuthHttp } from 'angular2-jwt';
import { Component } from '@angular/core';


@Component({
  selector: 'profile',
  template: `

<div class="row">
            <div class="col-md-6">
              <h3>Profile</h3>
              <img [src]="auth.userProfile.picture" alt="" class="profile-img">
              <form (ngSubmit)="onSubmit()">
                <div class="form-group">
                  <label for="name">Address</label>
                  <input type="text" class="form-control" [(ngModel)]="address" placeholder="Enter address">
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
              </form>
            </div>
          </div>
          `
})

export class ProfileEdit {
  address: String
  constructor(private auth: Auth, private authHttp: AuthHttp, private router: Router) {
    if(auth.userProfile.user_metadata && auth.userProfile.user_metadata.address){
      this.address = auth.userProfile.user_metadata.address;
    }
  }

  onSubmit() {
    var headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var data: any = JSON.stringify({
      user_metadata: {
        address: this.address
      }
    });

    this.authHttp
      .patch('https://' + 'jamesramadan.auth0.com' + '/api/v2/users/' + this.auth.userProfile.user_id, data, {headers: headers})
      .map(response => response.json())
      .subscribe(
        response => {
          //Update profile
          this.auth.userProfile = response;
          localStorage.setItem('profile', JSON.stringify(response));
          this.router.navigate(['/Profile']);
        },
        error => alert(error.json().message)
      );
  }
}