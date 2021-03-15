import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from '../../apiurl';
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";

@Injectable()
export class AddPurchasesProvider {

  url = apiURL.BASE_URL + 'add_purchases';

  constructor(private http: HttpClient) {}

  addPurchases(content: any): Observable<any> {
    return this.http.post(this.url, JSON.stringify(content), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
    }).pipe(catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || "";
      errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
