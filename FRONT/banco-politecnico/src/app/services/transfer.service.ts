import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private apiUrl: string;

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }

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
