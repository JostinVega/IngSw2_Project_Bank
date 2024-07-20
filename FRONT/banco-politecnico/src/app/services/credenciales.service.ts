import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredencialesService {
  private apiUrl = 'http://localhost:4000/';

  constructor(private http: HttpClient) {}

  getCredencialesUsuario(numero_identidad: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}credenciales-usuario/${numero_identidad}`);
  }
}
