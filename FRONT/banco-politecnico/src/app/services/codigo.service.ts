import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodigoService {
  url = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  sendSecurityCode(numero_identidad: string): Observable<any> {
    return this.http.post(`${this.url}/send-security-code`, { numero_identidad });
  }

  verifySecurityCode(numero_identidad: string, enteredCode: string): Observable<any> {
    return this.http.post(`${this.url}/verify-security-code`, { numero_identidad, enteredCode });
  }
}

