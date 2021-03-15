import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from '../../apiurl';

@Injectable()
export class AddLogisticsProvider {

  url = apiURL.BASE_URL + 'add_logistics';

  constructor(private http: HttpClient) {}

  addLogistics(messageContent: any) {
    return this.http.post(this.url, JSON.stringify(messageContent), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
    });
  }

}
