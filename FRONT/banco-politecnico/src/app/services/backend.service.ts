import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private backendUrl = 'https://back-comprobantes.vercel.app'; // URL para el backend principal

  constructor(private http: HttpClient) {}



  uploadComprobante(numeroComprobante: string, pdfData: string, pngData: string): Observable<any> {
    const payload = {
      numero_comprobante: numeroComprobante,
      pdfData: pdfData,
      pngData: pngData
    };
    return this.http.post(`${this.backendUrl}/upload-comprobante`, payload);
  }

  downloadComprobante(receiptNumber: string, fileType: string): Observable<Blob> {
    const url = `${this.backendUrl}/download-comprobante/${receiptNumber}/${fileType}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  
}



  /*
  uploadComprobante(formData: FormData): Observable<any> {
    return this.http.post(`${this.backendUrl}/upload-comprobante`, formData);
  }
  */