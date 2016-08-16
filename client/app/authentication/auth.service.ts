/* ===== app/auth.service.ts ===== */
import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt/angular2-jwt';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('lSGQqNGvDdE2GQdwFCQ9det1PCZUEU5q', 'jamesramadan.auth0.com', {
    additionalSignUpFields: [{
          name: "address",                              // required
          placeholder: "enter your address",            // required
          icon: "https://example.com/address_icon.png", // optional
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
        title: "Link with:"
      }
    });

  //Store profile object in auth class
    userProfile: Object;

  constructor() {

    // Set userProfile attribute of already saved profile
       this.userProfile = JSON.parse(localStorage.getItem('profile'));

    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {


      if(authResult.state != "linking"){
        localStorage.setItem('id_token', authResult.idToken);
        this.fetchProfile(authResult.idToken);
      }

      // Add callback for lockLink `authenticated` event
      this.lockLink.on("authenticated", (authResult) => {
        // Every lock instance listens to the same event, so you have to check if
        // it's the linking login here.
        if(authResult.state == "linking"){
          // If it's the linking login, then create the link through the API.
          this.doLinkAccounts(authResult.idToken);
        }
      });


      // localStorage.setItem('id_token', authResult.idToken);
      // // Fetch profile information
      // this.lock.getProfile(authResult.idToken, (error, profile) => {
      //   if (error) {
      //     // Handle error
      //     alert(error);
      //     return;
      //   }

      //   profile.user_metadata = profile.user_metadata || {};
      //   localStorage.setItem('profile', JSON.stringify(profile));
      //   this.userProfile = profile;
      // });

    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

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
  };
}