import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TerminalService {
  header = { 'content-type': 'application/problem+json' };

  constructor(private http: HttpClient) {}

  getDropdownList(): Observable<any> {
    return this.http.get(
      environment.QA + '/api/Order/GetAllOrdersTableDataForDD'
    );
  }

  postOrder(body: any): Observable<any> {
    console.log(body);

    return this.http.post(environment.QA + '/api/Order/AddOrder', body, {
      headers: this.header,
      responseType: 'json',
    });
  }

  getTableList(): Observable<any> {
    return this.http.get(environment.QA + '/api/Order/GetAllMerchantOrders');
  }

  postStatus(orderId: number): Observable<any> {
    const params = new HttpParams().set('orderId', orderId.toString());
    return this.http.post(environment.QA + '/api/Order/GetOrderStatus', null, {
      params,
    });
  }
}
