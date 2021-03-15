import { Component } from "@angular/core";
import { AlertController, IonicPage, LoadingController, NavController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { HomePage } from "../home/home";
import { LoginPage } from "../login/login";

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html",
})
export class RegisterPage {
  name: any;
  address: any;
  email: any;
  password: any;
  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController,
    public AuthService: AuthProvider
  ) {}

  ionViewDidLoad() {}

  register() {

    let loader = this.loadingCtrl.create({
      content: 'Registering..'
    });
    loader.present();

    var userObj = {
      name: this.name,
      address: this.address,
      email: this.email,
      password: this.password,
    };

    this.AuthService.registerUser(userObj)
      .then((response: any) => {
        loader.dismiss();
        if (response.success == true) {
          this.navCtrl.push(HomePage);
        }
      })
      .catch((err) => {
        loader.dismiss();
        this.presentAlert("Registration Failed. Try Again");
      });
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['Close']
    });
    alert.present();
  }

  // Go back to previous component
  goBack() {
    this.navCtrl.setRoot(HomePage);
  }

  showLoginPage() {
    this.navCtrl.push(LoginPage);
  }
}
