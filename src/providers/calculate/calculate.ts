import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';

const httpOptions = {
  headers:
  new HttpHeaders (
  {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:8100",
    
  }),
withCredentials: true,
};

@Injectable()
export class CalculateProvider {

  url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric';
  key = 'Key Here';

  constructor(public http: HttpClient, private geolocation : Geolocation) {
    console.log('Hello CalculateProvider Provider');
  }

  async calDistance(origin:string,destination:string) {
  
    var latlng=[];

    await this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log('lattitude and logintudes are :',resp.coords.latitude,resp.coords.longitude);
      latlng[0]= resp.coords.latitude;
      latlng[1]=resp.coords.longitude;

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  
  
    

     return await this.http.get(`${this.url}&origins=${latlng[0]},${latlng[1]}&destinations=${destination}&key=${this.key}`, httpOptions);


  }

  async getCurrentLoc(){
    await this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log('lattitude and logintudes are :',resp.coords.latitude,resp.coords.longitude);

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
