import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  resposeData: any;
  loading: Loading;
  registerCredentials = { email: '', password: '' };

  constructor(
    public nav: NavController,
    private auth: AuthServiceProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  public createAccount() {
    this.nav.push('RegisterPage');
  }

  public login() {
    this.showLoading()
    if (this.registerCredentials.email && this.registerCredentials.password) {
      this.auth.login(this.registerCredentials).then(result => {
        this.resposeData = result;
        console.log(this.resposeData);
        if (this.resposeData.accessToken) {
          localStorage.setItem("userData", JSON.stringify(this.resposeData));
          this.nav.push('RegisterPage');
        }
        else if (this.resposeData.statusText) {
          this.showError("You subbmited wrong email or password");
        } else {
          this.showError("Please give valid email and password");
        }
      },
        err => {
          {
            this.showError("Login failed ,Try again later !");
          }
        }
      );
    } else {
      this.showError("Username and Password cannot be empty ! ");
    }
  }



  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }


}
