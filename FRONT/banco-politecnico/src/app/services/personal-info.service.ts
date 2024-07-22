import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {

  private apiUrl = '/api/personal-info';

  constructor(private http: HttpClient) { }

  updatePersonalInfo(numero_identidad: string, email: string, phone: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizarPersonal/${numero_identidad}`, { email, phone });
  }

  verifySecurityCode(numero_identidad: string, enteredCode: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario/verifySecurityCode`, { numero_identidad, enteredCode });
  }
}
