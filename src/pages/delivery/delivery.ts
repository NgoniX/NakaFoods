import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { CalculateProvider } from './../../providers/calculate/calculate';
import { Component } from '@angular/core';

@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {

  location_distance ;
  destination_address ;
  origin_address ;
  travel_duration ;
  location ;

  constructor(private calculateService : CalculateProvider, 
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  ngOnint(){
    this.location_distance=null;
    this.destination_address=null;
    this.origin_address=null;
    this.travel_duration=null;
    this.location=null;
  }

  reset(){
    this.location_distance=null;
    this.destination_address=null;
    this.origin_address=null;
    this.travel_duration=null;
    this.location=null;
  }

  async changeDistance(location)
  {

    let loader = this.loadingCtrl.create({
      content: 'Searching..'
    });
    loader.present();
    
    var results = await this.calculateService.calDistance('jabalpur',location)
      results.subscribe(res=>{
      
      loader.dismiss();
      this.location_distance = res['rows']['0']['elements']['0']['distance']['text'];
      this.destination_address = res['destination_addresses'];
      this.origin_address = res['origin_addresses'];
      this.travel_duration = res['rows']['0']['elements']['0']['duration']['text'];
      console.log("Hey wena", this.location_distance)
    }, 
    (err) => {
      loader.dismiss();
      this.presentAlert("Nothing found. Try Again");
      console.log(err)
    }); 
  }
  

  async changeLocation(){
    await this.calculateService.getCurrentLoc();
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Search Error',
      subTitle: message,
      buttons: ['Close']
    });
    alert.present();
  }


}
