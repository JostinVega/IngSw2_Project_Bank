import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PreguntasSeguridadService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl; // Asegúrate de que environment.apiUrl esté definido correctamente
  }

  saveQuestions(registrationForm: any): Observable<any> {
    console.log('Datos recibidos para registrar:', registrationForm);
    return this.http.post<any>(`${this.apiUrl}/preguntas-seguridad`, registrationForm); // Asegúrate de que la ruta aquí sea correcta
  }

}
