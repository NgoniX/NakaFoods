import { ServicesProvider } from "./../../providers/services/services";
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  Events,
} from "ionic-angular";

@Component({
  selector: "page-services",
  templateUrl: "services.html",
})
export class ServicesPage {
  services: any[];
  serviceRows: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private servicesProvider: ServicesProvider,
    public events: Events,
    private loadingCtrl: LoadingController
  ) {}

  ionViewWillEnter() {
    this.loadServices();
  }

  ionViewDidLeave() {
    this.events.unsubscribe("serviceLoaded");
  }

  ionViewWillLeave() {}

  loadServices() {
    let loader = this.loadingCtrl.create({
      content: "Loading Services..",
    });
    loader.present();

    this.servicesProvider.getServices();
    this.events.subscribe("serviceLoaded", () => {
      this.services = this.servicesProvider.services;
      this.serviceRows = Array.from(
        Array(Math.ceil(this.services.length / 2)).keys()
      );
      loader.dismiss();
    });
  }

  showList(service) {
    this.navCtrl.push("ServiceListPage", { service: service });
  }
}
