import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  updateAccountBalance(accountNumber: string, newSaldo: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cuenta/actualizar-saldo/${accountNumber}`, { saldo: newSaldo });
  }

  getAccountByNumber(accountNumber: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cuenta/${accountNumber}`);
  }

  saveTransfer(transferData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/transferencias`, transferData);
  }
}
