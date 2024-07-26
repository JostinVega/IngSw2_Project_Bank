import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CredencialesService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getCredencialesUsuario(numeroIdentidad: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/credenciales-usuario/${numeroIdentidad}`);
  }
}
