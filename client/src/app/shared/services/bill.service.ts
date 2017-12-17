import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {PageableResults} from '../../model/pageable-results';
import {tap} from 'rxjs/operators';
import {User} from '../../model/user';
import {Bill} from '../../model/bill';
import {EntityService} from './entity.service';

@Injectable()
export class BillService extends EntityService<Bill> {
  baseUrl = environment.baseUrl;

  private billsUrl = this.baseUrl + '/api/bills?';

  /** GET ALL **/
  getBills(): Observable<PageableResults<Bill>> {
    return this.http.get<PageableResults<Bill>>(this.billsUrl)
      .pipe(
        tap(courses => console.log(courses))
      );
  }

  /** GET BY USER **/
  getBillByUser(user: User): Observable<Bill> {
    return this.http.get<Bill>(user._links.bill.href)
      .pipe();
  }

  /** POST **/
  addBill(bill: Bill, user?: User): Observable<Bill> {
    let rto = this.http.post<Bill>(this.billsUrl, bill);
    if (user) {
      rto = rto.delayWhen(c => this.updateBill(c, user._links.self.href));
    }
    return rto;
  }

  /** PUT **/
  updateBill(bill: Bill, uri?: string): Observable<any> {
    let requestUri = bill._links.self.href;
    let body: any = bill;
    if (uri) {
      requestUri = bill._links.user.href;
      body = uri;
    }
    console.log(requestUri);
    console.log(body);
    return this.http.put(requestUri, body)
      .pipe();
  }

  /** DELETE **/
  deleteBill(bill: Bill): Observable<any> {
    return this.http.delete<Bill>(bill._links.self.href)
      .pipe(
        tap(_ => console.log('delete bill'))
      );
  }
}
