import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login'

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  responseData: any;

  createSuccess = false;
  registerCredentials = { name: '', email: '', password: '', confirmation_password: '' };

  constructor(
    private nav: NavController,
    private auth: AuthServiceProvider,
    private alertCtrl: AlertController
  ) { }

  public register() {
      if (this.registerCredentials.password != this.registerCredentials.confirmation_password) {
        this.showPopup("Error", "Please insert credentials.");
      }
    this.auth.register(this.registerCredentials).then(
      result => {
        this.responseData = result;
        console.log(result);
        if (result != null) {
          this.createSuccess = true;
          this.nav.setRoot('LoginPage');
          this.showPopup("fine", "Successfully registered");
        }
        else {
          this.showPopup("Error", "Register failed ,Try again later!");
        }
      },
      err => {
        {
          this.showPopup("Error", "Register failed ,Try again later!");
        }
      }
    );
  }
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}
