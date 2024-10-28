import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  constructor(private http: HttpClient) {}

  getDropDownList(): Observable<any> {
    return this.http.get(environment.QA + '/api/Configuration/GetTableDetails');
  }
  getTableData(name: string): Observable<any> {
    return this.http.get(
      environment.QA + `/api/Configuration/GetColumnsByTableName/${name}`
    );
  }
}
