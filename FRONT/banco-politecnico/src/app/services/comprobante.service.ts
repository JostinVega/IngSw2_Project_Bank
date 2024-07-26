/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {
  private apiUrl = 'https://bancopolitecnico-backend.vercel.app';

  constructor(private http: HttpClient) { }

  saveComprobante(comprobanteData: any): Promise<any> {
    return this.http.post(`${this.apiUrl}/comprobantes`, comprobanteData).toPromise();
  }
}*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {
  private apiUrl: string;

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }

  saveComprobante(comprobanteData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/comprobantes`, comprobanteData);
  }
}
