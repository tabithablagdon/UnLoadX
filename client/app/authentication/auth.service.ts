/* ===== app/auth.service.ts ===== */
import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt/angular2-jwt';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';



// Avoid name not found warnings
declare var Auth0Lock: any;


@Injectable()
export class Auth {
  // subject to notify component when promise chain resolves
  lbStatus: boolean = false;
  lbUp: Subject<boolean> = new Subject<boolean>();
  // Configure Auth0
  lock = new Auth0Lock('lSGQqNGvDdE2GQdwFCQ9det1PCZUEU5q', 'jamesramadan.auth0.com', {
    languageDictionary: { // allows to override dictionary entries
        title: "UnLoadX"
      },
    theme: {
        logo: "https://cdn4.iconfinder.com/data/icons/orb/128/7.png",
    },
    additionalSignUpFields: [{
          name: "address",                              // required
          placeholder: "enter your address",            // required
          validator: function(value) {                  // optional
            // only accept addresses with more than 10 characters
            return value.length > 10;
          }
        }]
  });



  lockLink = new Auth0Lock('lSGQqNGvDdE2GQdwFCQ9det1PCZUEU5q', 'jamesramadan.auth0.com', {
      auth: {params: {state: "linking"}},
      allowedConnections: ['Username-Password-Authentication', 'facebook', 'google-oauth2'],
      languageDictionary: { // allows to override dictionary entries
        title: "UnLoadX"
      },
      theme: {
        logo: "https://cdn4.iconfinder.com/data/icons/orb/128/7.png",
      }
    });

  //Store profile object in auth class
  userProfile: any;

  constructor(private authHttp: AuthHttp, private router: Router, private http: Http) {

    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {

      if(authResult.state != "linking"){
        localStorage.setItem('id_token', authResult.idToken);
        this.fetchProfile(authResult.idToken);
      }
    });

    // Add callback for lockLink `authenticated` event
    this.lockLink.on("authenticated", (authResult) => {
      // Every lock instance listens to the same event, so you have to check if
      // it's the linking login here.
      if(authResult.state == "linking"){
        // If it's the linking login, then create the link through the API.
        this.doLinkAccounts(authResult.idToken);
      }

    });

  }
// localStorage.setItem('another_token_name', authResult.idToken);

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public linkAccount() {
    this.lockLink.show();
  }

  public doLinkAccounts(accountToLinkJWT) {
    console.log('dolinkacct called')
    var headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

  var data: any = JSON.stringify({
       link_with: accountToLinkJWT
     });

  this.authHttp
        .post('https://' + 'jamesramadan.auth0.com' + '/api/v2/users/' + this.userProfile.user_id + '/identities', data, {headers: headers})
        .map(response => response.json())
        .subscribe(
          response => {
            console.log("accounts linked");
            this.fetchProfile(localStorage.getItem('id_token'));
            this.router.navigate(['/profile']);
          },
          error => alert(error.json().message)
        );
  }

  public unLinkAccount(identity) {
    var headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    this.authHttp
    .delete('https://' + 'jamesramadan.auth0.com' + '/api/v2/users/' + this.userProfile.user_id + '/identities/' + identity.provider + "/" + identity.user_id, {headers: headers})
      .map(response => response.json())
      .subscribe(
        response => {
          console.log("unlinked account");
          this.fetchProfile(localStorage.getItem('id_token'));
          this.router.navigate(['Profile']);
        },
        error => alert(error.json().message)
      );
  }

  public linkedAccounts() {
   return this.userProfile.identities.filter(identity => {
      return this.userProfile.user_id != identity.provider + '|' + identity.user_id
    })
  }

  public fetchProfile(token) {
     this.userProfile = null;
     // Fetch profile information
     this.lock.getProfile(token, (error, profile) => {
       if (error) {
         // Handle error
         alert(error);
         return;
       }

       profile.user_metadata = profile.user_metadata || {};
       localStorage.setItem('profile', JSON.stringify(profile));
       this.userProfile = profile;
       let body = {
         name: profile.name,
         authUserId: profile.user_id,
         email: profile.email,
       }
       // send user's name and id to server
       this.postAuthUser(body)
     });
   };

   private postAuthUser(body) {
     const headers = new Headers({ 'Content-Type': 'application/json' });
     const options = new RequestOptions({ headers: headers })
     return this.http.post('/api/user', JSON.stringify(body), options)
      .toPromise()
      .then(res => {
        console.log('response from post')

        // change the button to enabled
        // emit an event, or whatever
        this.lbStatus = true
        this.lbUp.next(this.lbStatus)
      })
      .catch(err => console.log(`err from psot: ${err}`))
   }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
    this.router.navigate(['']);
  };
}
