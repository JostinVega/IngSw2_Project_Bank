/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodigoService {
  url = 'https://bancopolitecnico-backend.vercel.app';

  constructor(private http: HttpClient) { }

  sendSecurityCode(numeroIdentidad: string): Observable<any> {
    return this.http.post(`${this.url}/send-security-code`, { numeroIdentidad });
  }

  verifySecurityCode(enteredCode: string): Observable<any> {
    return this.http.post(`${this.url}/verify-security-code`, { enteredCode });
  }
}*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodigoService {
  private apiUrl: string;

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }

  sendSecurityCode(numeroIdentidad: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-security-code`, { numeroIdentidad });
  }

  verifySecurityCode(enteredCode: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-security-code`, { enteredCode });
  }
}
