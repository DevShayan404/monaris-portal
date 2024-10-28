import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BearerTokenService {
  constructor(private http: HttpClient) {}

  getBearerToken(
    gratType: string,
    clientId: string,
    clientSecret: string,
    scope: string
  ): Observable<any> {
    return this.http.get(
      environment.QA +
        `/api/Merchant/Get_Post_AccessToken?grant_type=${gratType}&client_id=${clientId}&client_secret=${clientSecret}&scope=${scope}`
    );
  }
}
