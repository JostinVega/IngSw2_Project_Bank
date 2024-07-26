

// tipo-cuenta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoCuentaService {
  private accountData: any = {};

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  setAccountData(data: any) {
    this.accountData = data;
  }

  getAccountData() {
    return this.accountData;
  }

  saveCuenta(registrationForm: any): Observable<any> {
    console.log('Datos recibidos para registrar:', registrationForm);
    return this.http.post<any>(`${this.apiUrl}/tipo-cuenta`, registrationForm);
  }
}



