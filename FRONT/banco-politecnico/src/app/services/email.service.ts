
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/*
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:3000/send-email';

  constructor(private http: HttpClient) {}

  sendEmail(subject: string, description: string): Observable<any> {
    const body = { subject, description };
    return this.http.post<any>(this.apiUrl, body);
  }
}
  */
/*
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:3000/send-email'; // Asegúrate de que esta URL es correcta

  constructor(private http: HttpClient) {}

  sendEmail(subject: string, description: string, userEmail: string): Observable<any> {
    const emailData = { subject, description, userEmail };
    return this.http.post<any>(this.apiUrl, emailData);
  }
}
*/
/*
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:3000/send-email'; // Asegúrate de que esta URL es correcta

  constructor(private http: HttpClient) {}

  sendEmail(subject: string, description: string, userEmail: string): Observable<any> {
    const emailData = { subject, description, userEmail };
    return this.http.post<any>(this.apiUrl, emailData);
  }
}
  */


@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'https://back-contactar-soporte.vercel.app/send-email'; // CONTACTAR SOPORTE

  constructor(private http: HttpClient) {}

  sendEmail(subject: string, description: string, userEmail: string): Observable<any> {
    const emailData = { subject, description, userEmail };
    return this.http.post<any>(this.apiUrl, emailData);
  }
}




