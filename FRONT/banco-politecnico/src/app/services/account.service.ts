import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getUserAccounts(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios/${username}`);
  }

  verifyAccount(accountNumber: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verificarCuenta/${accountNumber}`);
  }
}
