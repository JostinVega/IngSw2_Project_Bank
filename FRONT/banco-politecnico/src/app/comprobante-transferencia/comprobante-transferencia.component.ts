/*import { Component, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { UniqueNumberServiceService } from '../services/unique-number-service.service';
import { TransferService } from '../services/transfer.service';

@Component({
  selector: 'app-comprobante-transferencia',
  templateUrl: './comprobante-transferencia.component.html',
  styleUrls: ['./comprobante-transferencia.component.css']
})
export class ComprobanteTransferenciaComponent implements OnInit {


  amount: string = '';
  comment: string = '';
  costoTransaccion: number = 0;  // Asumiendo que tienes un costo de transacción que necesitas mostrar
  fecha: Date = new Date();
  beneficiary = {
    name: '',
    number: ''
  };
  selectedAccount: string = '';
  @Input() comprobante: string = '';
  cuentaOrigen = {
    nombre: '',
    numeroCuenta: ''
  };

  constructor(private router: Router, private uniqueNumberService: UniqueNumberServiceService, private transferService: TransferService) {}

  ngOnInit(): void {
    this.comprobante = this.uniqueNumberService.generateUniqueNumber().toString();
    const transferData = this.transferService.getTransferData();
    this.amount = transferData.amount;
    this.comment = transferData.comment;
    this.beneficiary.name = transferData.beneficiary.name;
    this.beneficiary.number = transferData.beneficiary.number;
    this.selectedAccount = transferData.selectedAccount;
  }

  downloadPDF() {
    const data = document.getElementById('receipt');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const heightLeft = imgHeight;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;
  
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('comprobante.pdf');
      });
    }
  }

  downloadPNG() {
    const data = document.getElementById('receipt');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'comprobante.png';
        link.click();
      });
    }
  }
  

  goToHome() {
    this.router.navigate(['/inicio']);
  }
}
*/

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-comprobante-transferencia',
  templateUrl: './comprobante-transferencia.component.html',
  styleUrls: ['./comprobante-transferencia.component.css']
})
export class ComprobanteTransferenciaComponent implements OnInit {
  cuentaNombre: string = '';
  numeroCuenta: string = '';
  tipoCuenta: string = '';
  saldo: number = 0;
  amount: number = 0;
  usuario: string = '';
  numeroIdentidad: string = '';
  contactName: string = '';
  contactNumber: string = '';
  comment: string = '';
  comprobante: string = '';
  costoTransaccion: number = 0;
  fecha: Date = new Date();

  beneficiary = {
    name: '',
    number: ''
  };
  cuentaOrigen = {
    nombre: '',
    numeroCuenta: ''
  };

  constructor(private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cuentaNombre = params['cuentaNombre'] || '';
      this.numeroCuenta = params['numeroCuenta'] || '';
      this.tipoCuenta = params['tipoCuenta'] || '';
      this.saldo = +params['saldo'] || 0;
      this.amount = +params['amount'] || 0;
      this.usuario = params['usuario'] || '';
      this.numeroIdentidad = params['numeroIdentidad'] || '';
      this.contactName = params['contactName'] || '';
      this.contactNumber = params['contactNumber'] || '';
      this.comment = params['comment'] || '';

      this.beneficiary.name = this.contactName;
      this.beneficiary.number = this.contactNumber;
      this.cuentaOrigen.nombre = this.cuentaNombre;
      this.cuentaOrigen.numeroCuenta = this.numeroCuenta;

      this.comprobante = this.generateUniqueComprobante();
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
  }

  generateUniqueComprobante(): string {
    return 'COMP-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  downloadPDF() {
    const data = document.getElementById('receipt');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('comprobante.pdf');
      });
    }
  }

  downloadPNG() {
    const data = document.getElementById('receipt');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'comprobante.png';
        link.click();
      });
    }
  }

  goToHome() {
    this.router.navigate(['/inicio'], {
      queryParams: {
        numeroIdentidad: this.numeroIdentidad,
        usuario: this.usuario
      }
    });
  }
}
