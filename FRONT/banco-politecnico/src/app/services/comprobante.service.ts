/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {
  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  saveComprobante(comprobanteData: any): Promise<any> {
    return this.http.post(`${this.apiUrl}/comprobantes`, comprobanteData).toPromise();
  }
}*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {
  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  saveComprobante(comprobanteData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/comprobantes`, comprobanteData);
  }
}
