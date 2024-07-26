import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getUsuario(numeroIdentidad: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuario/${numeroIdentidad}`);
  }

  getLabel(value: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/label/${value}`);
  }

  getUsuarioWithLabels(numeroIdentidad: string): Observable<any> {
    return this.getUsuario(numeroIdentidad).pipe(
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
