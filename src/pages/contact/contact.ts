import { ContactProvider } from './../../providers/contact/contact';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController, ToastController } from "ionic-angular";
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  contactForm: FormGroup;

  constructor(
            public navCtrl: NavController, 
            public toastCtrl: ToastController,
            private alertCtrl: AlertController,
            private loadingCtrl: LoadingController,
            private contactService: ContactProvider,
            fb: FormBuilder,
            public navParams: NavParams
            ) {

              this.contactForm = fb.group({
                name: ['', Validators.required],
                email: ['', Validators.compose([Validators.required, Validators.email])],
                message: ['', Validators.required],
              });
            }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  // add logistics
  onSubmit() {

    let loader = this.loadingCtrl.create({
      content: "Submitting..",
    });
    loader.present();

    this.contactService.sendMessage(this.contactForm.value).subscribe(
      () => {
        loader.dismiss();
        this.presentToast("Form succesfully submitted.");
        this.contactForm.reset();
      },
      (error) => {
        loader.dismiss();
        console.log('Error', error);
        this.presentAlert("Submit Failed. Try Again");
      }
    );

  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: "bottom",
    });
    toast.present();
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Message',
      subTitle: message,
      buttons: ['Close']
    });
    alert.present();
  }

  // check if form is valid
  checkValid() {
    if (this.contactForm.valid) {
      return false;
    } else {
      return true;
    }
  }

}
