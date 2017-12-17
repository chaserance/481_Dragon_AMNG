import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Pageable} from '../../model/pageable';
import {Observable} from 'rxjs/Observable';
import {PageableResults} from '../../model/pageable-results';
import {Promotion} from '../../model/promotion';
import {Bill} from '../../model/bill';
import {EntityService} from './entity.service';

@Injectable()
export class PromotionService extends EntityService<Promotion> {
  baseUrl = environment.baseUrl;

  private promotionsUrl = this.baseUrl + '/api/promotions?';

  /** GET ALL **/
  getPromotions(pageable?: Pageable): Observable<PageableResults<Promotion>> {
    return this.http.get<PageableResults<Promotion>>(this.promotionsUrl + (pageable ? pageable : ''))
      .pipe();
  }

  /** GET BY BILL **/
  getPromotionByBill(bill: Bill): Observable<PageableResults<Promotion>> {
    return this.http.get<PageableResults<Promotion>>(bill._links.promotion.href)
      .pipe();
  }

  /** POST **/
  addPromotion(promotion: Promotion): Observable<Promotion> {
    return this.http.post<Promotion>(this.promotionsUrl, promotion)
      .pipe();
  }

  /** PUT **/
  updatePromotion(promotion: Promotion, uri?: string): Observable<any> {
    const requestUri = promotion._links.self.href;
    const body: any = promotion;
    return this.http.put(requestUri, body)
      .pipe();
  }

  /** DELETE **/
  deletePromotion(promotion: Promotion): Observable<any> {
    return this.http.delete<Promotion>(promotion._links.self.href)
      .pipe();
  }
}
