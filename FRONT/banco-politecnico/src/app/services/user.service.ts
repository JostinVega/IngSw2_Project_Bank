import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://back-contactar-soporte.vercel.app'; // CONTACTAR SOPORTE
  private apiUrlBack: string;

  constructor(private http: HttpClient) {
    this.apiUrlBack = environment.apiUrl;
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
  }

  getUserByUsername(numeroIdentidad: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlBack}/getUsuarioByNumeroIdentidad/${numeroIdentidad}`);
  }
}
