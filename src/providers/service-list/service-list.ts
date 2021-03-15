import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import firebase from "firebase";

@Injectable()
export class ServiceListProvider {
  serviceRef = firebase.database().ref("service_list");
  service_list: Array<any> = [];
  constructor(public events: Events) {}

  getServiceByID(serviceId) {
    this.serviceRef
      .orderByChild("list_id")
      .equalTo(serviceId)
      .once("value", (snap) => {
        this.service_list = [];
        if (snap.val()) {
          var tempServices = snap.val();
          for (var key in tempServices) {
            let singleService = {
              id: key,
              list_id: tempServices[key].list_id,
              name: tempServices[key].name,
            };

            this.service_list.push(singleService);
          }
        }
        this.events.publish("servicesLoaded");
      });
  }
}
