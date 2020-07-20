import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import firebase from "firebase";

@Injectable()
export class ServicesProvider {
  servicesRef = firebase.database().ref("services");

  services: Array<any> = [];

  constructor(public events: Events) {}

  getServices() {
    this.servicesRef.once("value", snap => {
      this.services = [];
      if (snap.val()) {
        var tempservices = snap.val();
        for (var key in tempservices) {
          let singleService = {
            id: key,
            name: tempservices[key].name,
            thumb: tempservices[key].thumb
          };

          this.services.push(singleService);
        }
      }
      this.events.publish("serviceLoaded");
    });
  }
}
