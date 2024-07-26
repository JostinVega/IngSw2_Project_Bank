// src/app/services/bloqueo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BloqueoService {

  private apiUrl: string;
  //private apiUrl = 'https://bancopolitecnico-backend.vercel.app'; // URL base de la API

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  bloquearUsuario(usuario: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/bloquear-usuario`, { usuario });
  }

  bloquearUsuarioNumeroIdentidad(numeroIdentidad: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/bloquear-usuario-por-identidad`, { numeroIdentidad });
  }
}
