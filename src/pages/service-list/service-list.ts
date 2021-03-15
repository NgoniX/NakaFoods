import { AddLogisticsProvider } from './../../providers/add-logistics/add-logistics';
import { AuthProvider } from './../../providers/auth/auth';
import { ServiceListProvider } from "./../../providers/service-list/service-list";
import { LoadingController, AlertController, ToastController } from "ionic-angular";
import { Events } from "ionic-angular";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-service-list",
  templateUrl: "service-list.html",
})
export class ServiceListPage {
  isEmpty: boolean;
  services: any[];
  serviceID: string;
  serviceName: string;

  userEmail: string;

  logisticForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    fb: FormBuilder,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private logisticsService: AddLogisticsProvider,
    private serviceProvider: ServiceListProvider,
    public events: Events,
    private loadingCtrl: LoadingController
  ) {  

    this.logisticForm = fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      message: ['', Validators.required],
      weightSize: ['', Validators.required],
      accept: [false, Validators.requiredTrue],
    });

    // set current user in email field
    this.logisticForm.patchValue({
      email: this.auth.getUserEmail,
    });

  }

  ionViewDidLoad() {
    this.serviceID = this.navParams.get("service").id;
    this.serviceName = this.navParams.get("service").name;

    this.loadServices(this.navParams.get("service").id);

    // get email
    this.userEmail = this.auth.getUserEmail;
  }

  ionViewDidLeave() {
    this.events.unsubscribe("servicesLoaded");
  }

  loadServices(serviceId) {
    let loader = this.loadingCtrl.create({
      content: "Loading Services..",
    });
    loader.present();

    this.serviceProvider.getServiceByID(serviceId);
    this.events.subscribe("servicesLoaded", () => {
      this.isEmpty = false;
      if (this.serviceProvider.service_list.length) {
        this.services = this.serviceProvider.service_list;
        loader.dismiss();
      } else {
        this.isEmpty = true;
        loader.dismiss();
      }
    });
  }

  // add logistics
  onSubmit() {

    let loader = this.loadingCtrl.create({
      content: "Submitting..",
    });
    loader.present();

    this.logisticsService.addLogistics(this.logisticForm.value).subscribe(
      () => {
        loader.dismiss();
        this.presentToast("Info succesfully submitted.");
        this.logisticForm.reset();
      },
      (error) => {
        loader.dismiss();
        console.log('Error', error);
        this.presentAlert("Submit Failed. Try Again");
      }
    );

  }

  showInfo(service) {
    this.navCtrl.push("ServiceInfoPage", { service: service });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: "top",
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
    if (this.logisticForm.valid) {
      return false;
    } else {
      return true;
    }
  }

}
