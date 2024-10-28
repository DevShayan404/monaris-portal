import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  header = { 'content-type': 'application/problem+json' };

  constructor(private http: HttpClient) {}

  getAllDropdownList(): Observable<any> {
    return this.http.get(environment.QA + '/api/Merchant/GetAllTableDataForDD');
  }

  postChainId(id: any): Observable<any> {
    const params = new HttpParams().set('number', id.toString());
    return this.http.post(
      environment.QA + '/api/Merchant/AddMerchantChainId',
      null,
      { params }
    );
  }

  postMerchantForm(body: any): Observable<any> {
    return this.http.post(
      environment.QA + '/api/Merchant/PostMerchantDetails',
      body,
      {
        headers: { 'content-type': 'application/problem+json' },
        responseType: 'json',
      }
    );
  }

  getAllMerchantList(): Observable<any> {
    return this.http.get(environment.QA + '/api/Merchant/GetAllMerchant');
  }

  postChainDetail(body: any): Observable<any> {
    return this.http.post(
      environment.QA + '/api/Order/AddMerchantChainId',
      body,
      {
        headers: this.header,
        responseType: 'json',
      }
    );
  }

  getMerchantDetail(id: number): Observable<any> {
    return this.http.get(
      environment.QA + `/api/Merchant/GetAllMerchantDetails/${id}`
    );
  }
}
