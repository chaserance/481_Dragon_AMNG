import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {PageableResults} from '../model/pageable-results';
import {tap} from 'rxjs/operators';
import {User} from '../model/user';
import {Bill} from '../model/bill';

@Injectable()
export class BillService {
  baseUrl = environment.baseUrl;

  private billsUrl = this.baseUrl + '/api/bills/';

  constructor(private http: HttpClient) { }

  /** GET ALL **/
  getBills(): Observable<PageableResults<Bill>> {
    return this.http.get<PageableResults<Bill>>(this.billsUrl)
      .pipe(
        tap(courses => console.log(courses))
      );
  }

  /** GET ALL BY USER **/
  getBillByUser(bill: Bill): Observable<PageableResults<Bill>> {
    return this.http.get<PageableResults<Bill>>(bill._links.user.href)
      .pipe(
        tap(b => console.log(b))
      );
  }

  /** POST **/
  addBill(bill: Bill, user?: User): Observable<Bill> {
    return this.http.post<Bill>(this.billsUrl, bill)
      .pipe(
        tap(_ => {
          console.log('add new bill');
          if (user) {
            this.updateBill(bill, user._links.self.href);
          }
        }),
      );
  }

  /** PUT **/
  updateBill(bill: Bill, uri?: string): Observable<any> {
    let requestUri = bill._links.self.href;
    let body: any = bill;
    if (uri) {
      requestUri = bill._links.user.href;
      body = uri;
    }
    return this.http.put(requestUri, body)
      .pipe(
        tap(_ => console.log('update bill'))
      );
  }

  /** DELETE **/
  deleteBill(bill: Bill): Observable<any> {
    return this.http.delete<Bill>(bill._links.self.href)
      .pipe(
        tap(_ => console.log('delete bill'))
      );
  }
}
