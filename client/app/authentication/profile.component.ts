import { AuthHttp } from 'angular2-jwt';
import { Component } from '@angular/core';
import { Auth } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './client/app/authentication/profile.component.html',
  providers: [Auth, Router, AuthHttp]
})

export class ProfileEdit {
  address: String
  constructor(private auth: Auth, private authHttp: AuthHttp, private router: Router) {
    console.log('here is auth userprofile user id:', auth.userProfile.user_id);
    console.log('here is auth userprofile metadata:', auth.userProfile.user_metadata);
    if(auth.userProfile.user_metadata && auth.userProfile.user_metadata.address){
      this.address = auth.userProfile.user_metadata.address;
      console.log('in the conditional, here is this.address: ', this.address);
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
          console.log('auth response: ', JSON.stringify(response));
          this.auth.userProfile = response;
          localStorage.setItem('profile', JSON.stringify(response));
          this.router.navigate(['/Profile']);
        },
        error => alert(error.json().message)
      );
  }
}
