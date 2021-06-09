import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from '../../apiurl';

@Injectable()
export class ContactProvider {

  url = apiURL.BASE_URL + 'email';

  constructor(public http: HttpClient) {
    console.log('Hello ContactProvider Provider');
  }

  sendMessage(messageContent: any) {
    return this.http.post(this.url, JSON.stringify(messageContent), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
    });
  }

}
