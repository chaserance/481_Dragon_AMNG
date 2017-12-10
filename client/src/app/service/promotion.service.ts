import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Pageable} from '../model/pageable';
import {Observable} from 'rxjs/Observable';
import {PageableResults} from '../model/pageable-results';
import {Promotion} from '../model/promotion';

@Injectable()
export class PromotionService {
  baseUrl = environment.baseUrl;

  private promotionsUrl = this.baseUrl + '/api/promotions/';

  constructor(private http: HttpClient) { }

  /** GET ALL **/
  getPromotions(pageable?: Pageable): Observable<PageableResults<Promotion>> {
    console.log(this.promotionsUrl + pageable);
    return this.http.get<PageableResults<Promotion>>(this.promotionsUrl + (pageable ? pageable : ''))
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
