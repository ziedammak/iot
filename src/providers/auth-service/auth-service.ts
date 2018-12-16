import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

 
  static readonly LOGIN_URL = 'https://localhost:8443/auth';
  
  static readonly REGISTER_URL = 'https://localhost:8443/users';
  access: boolean;
  token: string;

  constructor(public http: Http) {}

  // Login
  public login(credentials) {
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post( AuthServiceProvider.LOGIN_URL, JSON.stringify(credentials), { headers: headers }).
          subscribe(res => {
            resolve(res.json());
          }, (err) => {
            if (err.statusText == "Unauthorized") {
              resolve(err);
            }
            else {
              reject(err);
            }
          });

      });
  }

  // Register
  public register(credentials) {
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(AuthServiceProvider.REGISTER_URL, JSON.stringify(credentials), { headers: headers }).
          subscribe(res => {
            resolve(res.json());
          }, (err) => {
            if (err.statusText == "Unauthorized") {
              resolve(err);
            }
            else {
              reject(err);
            }
          });

      });

    }
  // Get Token
  public getToken() {
    return this.token;
  }

  // Logout
  public logout() {
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }

}
