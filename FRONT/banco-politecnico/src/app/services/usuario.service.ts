import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrlUsuario = 'http://localhost:4000/usuario';
  private apiUrlLabel = 'http://localhost:4000/label';
  private apiUrl = 'http://localhost:4000'; 

  constructor(private http: HttpClient) {}

  getUsuario(numero_identidad: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlUsuario}/${numero_identidad}`);
  }

  getLabel(value: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlLabel}/${value}`);
  }

  getUsuarioWithLabels(numero_identidad: string): Observable<any> {
    return this.getUsuario(numero_identidad).pipe(
      switchMap(usuario => {
        const questions = [
          usuario.usuario.question1,
          usuario.usuario.question2,
          usuario.usuario.question3,
          usuario.usuario.question4,
          usuario.usuario.question5
        ];

        const labelObservables = questions.map(question => this.getLabel(question));
        
        return forkJoin(labelObservables).pipe(
          map(labels => ({
            ...usuario.usuario,
            labels: labels.map(labelResponse => labelResponse.label)
          }))
        );
      })
    );
  }

  updatePasswordUsuario(cedula: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update-password`, { cedula, newPassword });
  }

  updatePasswordOtraColeccion(cedula: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/actualizar-password`, { cedula, newPassword });
  }
}
