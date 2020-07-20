import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  name: any;
  address: any;
  email: any;
  password: any;
  constructor(
    public navCtrl: NavController,
    public AuthService: AuthProvider
  ) {}

  ionViewDidLoad() {}

  register() {
    var userObj = {
      name: this.name,
      address: this.address,
      email: this.email,
      password: this.password
    };

    this.AuthService.registerUser(userObj)
      .then((response: any) => {
        if (response.success == true) {
          this.navCtrl.push('CheckoutPage');
        }
      })
      .catch(err => {
        alert(JSON.stringify(err));
      });
  }

  // Go back to previous component
  goBack() {
    this.navCtrl.setRoot(HomePage);
  }

  showLoginPage() {
    this.navCtrl.push("LoginPage");
  }
}
