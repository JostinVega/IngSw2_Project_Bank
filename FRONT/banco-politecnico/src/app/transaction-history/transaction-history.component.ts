import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { AccountService } from '../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../services/backend.service';

interface Transaction {
  date: string;
  amount: number;
  beneficiary: string;
  type: string;
  description: string;
  balanceBefore: number;
  balanceAfter: number;
  account: string;
  accountType: string;
  receiptNumber: string;
  selected?: boolean;
}

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit{
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  accounts: string[] = [];
  searchAccount: string = '';
  searchAccountType: string = '';
  searchDateFrom: string = '';
  searchDateTo: string = '';
  searchType: string = '';
  searchCedula: string = ''; // Nueva propiedad para el número de cédula
  private alertShown: boolean = false; // Nueva propiedad para controlar la alerta

  usuarioAdministrador: string = '';


  // URL para descargar comprobantes

  constructor(
    private router: Router,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private http: HttpClient, // Inyectar HttpClient
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.usuarioAdministrador = params['usuarioAdministrador'];
      console.log(this.usuarioAdministrador);
    });
    this.filteredTransactions = this.transactions;
  }

  formatDateString(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }

  filterTransactions() {
    const dateFrom = this.searchDateFrom ? new Date(this.formatDateString(this.searchDateFrom)) : null;
    const dateTo = this.searchDateTo ? new Date(this.formatDateString(this.searchDateTo)) : null;
    
    if (dateTo) {
      dateTo.setHours(23, 59, 59, 999); // Incluir todo el día
    }
    
    this.filteredTransactions = this.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const matchesAccount = this.searchAccount ? transaction.account === this.searchAccount : true;
      const matchesAccountType = this.searchAccountType ? transaction.accountType.toLowerCase() === this.searchAccountType.toLowerCase() : true;
      const matchesDateFrom = dateFrom ? transactionDate >= dateFrom : true;
      const matchesDateTo = dateTo ? transactionDate <= dateTo : true;
      const matchesType = this.searchType ? transaction.type.toLowerCase() === this.searchType.toLowerCase() : true;
      return matchesAccount && matchesAccountType && matchesDateFrom && matchesDateTo && matchesType;
    });
  }

  onCedulaChange(): void {
    if (this.searchCedula) {
      this.fetchAccountsByCedula(this.searchCedula);
    } else {
      console.error('Número de cédula no disponible');
      this.showAlert('Por favor, ingrese un número de cédula.');
    }
  }

  /*
  fetchAccountsByCedula(cedula: string): void {
    this.accountService.getAccountsByCedula(cedula).subscribe(
      data => {
        console.log('Cuentas recibidas:', data);
        this.accounts = data.cuentas.map((account: any) => account.cuentaNombre);
      },
      error => {
        console.error('Error fetching accounts by cédula:', error);
      }
    );
  }
  */

  fetchAccountsByCedula(cedula: string): void {
    this.accountService.getAccountsByCedula(cedula).subscribe(
      data => {
        console.log('Cuentas recibidas:', data);
        this.accounts = data.cuentas.map((account: any) => account.cuentaNombre);
        //this.accounts = data.cuentas;
        if (this.accounts.length === 0) {
          this.showAlert('No se encontraron cuentas asociadas al número de cédula proporcionado.');
        }
      },
      error => {
        const errorMessage = error.error.message || 'Error al obtener cuentas. Intente nuevamente más tarde.';
        this.showAlert(errorMessage);
      }
    );
  }

  /*
  validateCedula(event: any): void {
    const input = event.target.value;
    // Elimina cualquier carácter no numérico
    this.searchCedula = input.replace(/[^0-9]/g, '');
  }
  */

  validateCedula(event: any): void {
    const input = event.target.value;
    // Elimina cualquier carácter no numérico
    const sanitizedInput = input.replace(/[^0-9]/g, '');
    this.searchCedula = sanitizedInput;
  
    // Actualiza el valor en el campo de texto
    event.target.value = sanitizedInput;
  }
  

  /*
  checkCedulaLength(): void {
    if (this.searchCedula.length < 10 && this.searchCedula.length > 0) {
      alert('Por favor, ingrese un número de cédula válido de 10 dígitos.');
    }
  }
  */

  checkCedulaLength(): void {
    if (this.searchCedula.length < 10 && this.searchCedula.length > 0 && !this.alertShown) {
      this.alertShown = true; // Marcar la alerta como mostrada
      alert('Por favor, ingrese un número de cédula válido de 10 dígitos.');
    }
  }

  

  onAccountChange(cuentaNombre: string): void {
    this.getNumeroCuenta(cuentaNombre);
  }

  getNumeroCuenta(cuentaNombre: string): void {
    this.accountService.getNumeroCuenta(cuentaNombre).subscribe(
      data => {
        this.searchAccount = data.numeroCuenta;
        console.log('Número de Cuenta recibido:', data.numeroCuenta);
        this.getTransferencias(this.searchAccount);
      },
      error => {
        console.error('Error fetching numeroCuenta:', error);
      }
    );
  }

  getTransferencias(numeroCuenta: string): void {
    this.accountService.getTransferenciasByNumeroCuenta(numeroCuenta).subscribe(
      data => {
        console.log('Transferencias recibidas:', data.transferencias);
        this.transactions = data.transferencias.map((trans: any) => {
          const isOutgoing = trans.cuenta_origen.numero_cuenta === numeroCuenta;
          return {
            date: trans.fecha,
            amount: parseFloat(trans.monto),
            beneficiary: isOutgoing ? trans.cuenta_destino.nombre_completo : trans.cuenta_origen.nombre_completo,
            type: isOutgoing ? 'Egreso' : 'Ingreso',
            description: trans.comentario || '',
            balanceBefore: parseFloat(isOutgoing ? trans.cuenta_origen.saldoAntes : trans.cuenta_destino.saldoAntes),
            balanceAfter: parseFloat(isOutgoing ? trans.cuenta_origen.saldoDespues : trans.cuenta_destino.saldoDespues),
            account: isOutgoing ? trans.cuenta_origen.numero_cuenta : trans.cuenta_destino.numero_cuenta,
            accountType: isOutgoing ? trans.cuenta_destino.tipoCuenta : trans.cuenta_origen.tipoCuenta,
            receiptNumber: trans.numero_comprobante_transferencia
          };
        });
        this.filterTransactions();  // Filtrar transacciones después de obtenerlas
      },
      error => {
        console.error('Error fetching transferencias:', error);
        this.transactions = []; // Vaciar la lista de transacciones en caso de error
        this.filterTransactions();
      }
    );
  }

  sortTransactions(order: 'asc' | 'desc') {
    this.filteredTransactions.sort((a, b) => {
      if (order === 'asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }

  toggleAll(event: any) {
    const checked = event.target.checked;
    this.filteredTransactions.forEach(transaction => (transaction.selected = checked));
  }

  downloadSelectedAsPDF() {
    const selectedTransactions = this.filteredTransactions.filter(transaction => transaction.selected);
    if (selectedTransactions.length === 0) {
      alert('Por favor, seleccione al menos una transacción para descargar.');
      return;
    }
  
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'a4'
    });
  
    const head = [['Fecha', 'Monto', 'Beneficiario', 'Tipo de Cuenta', 'Tipo de Transacción', 'Descripción', 'Saldo Antes', 'Saldo Después', 'Número de Comprobante']];
    const body = selectedTransactions.map(transaction => [
      new Date(transaction.date).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      "$" + transaction.amount.toFixed(2),
      transaction.beneficiary,
      transaction.accountType,
      transaction.type,
      transaction.description,
      "$" + transaction.balanceBefore.toFixed(2),
      "$" + transaction.balanceAfter.toFixed(2),
      transaction.receiptNumber
    ]);
  
    autoTable(doc, {
      head: head,
      body: body,
      styles: { 
        fontSize: 10, 
        halign: 'center', 
        valign: 'middle',
        cellPadding: 5,
        overflow: 'linebreak',
      },
      headStyles: { 
        fillColor: [32, 110, 169],
        textColor: [255, 255, 255], 
        fontSize: 12 
      },
      columnStyles: {
        0: { cellWidth: 70 },
        1: { cellWidth: 60 },
        2: { cellWidth: 90 },
        3: { cellWidth: 70 },
        4: { cellWidth: 90 },
        5: { cellWidth: 100 },
        6: { cellWidth: 70 },
        7: { cellWidth: 70 },
        8: { cellWidth: 100 }
      },
      margin: { top: 20, left: 20, right: 20, bottom: 20 },
      theme: 'grid',
    });
  
    doc.save('transacciones.pdf');
  }
  
  downloadSelectedAsExcel() {
    const selectedTransactions = this.filteredTransactions.filter(transaction => transaction.selected);
    if (selectedTransactions.length === 0) {
      alert('Por favor, seleccione al menos una transacción para descargar.');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(selectedTransactions.map(transaction => ({
      Fecha: transaction.date,
      Monto: '$' + transaction.amount,
      Beneficiario: transaction.beneficiary,
      'Tipo de Cuenta': transaction.accountType,
      'Tipo de Transacción': transaction.type,
      Descripción: transaction.description,
      'Saldo Antes': transaction.balanceBefore,
      'Saldo Después': transaction.balanceAfter,
      'Número de Comprobante': transaction.receiptNumber
    })));

    const workbook = { Sheets: { 'Transacciones': worksheet }, SheetNames: ['Transacciones'] };
    XLSX.writeFile(workbook, 'transacciones.xlsx');
  }

  downloadFile(receiptNumber: string, fileType: string) {
    this.backendService.downloadComprobante(receiptNumber, fileType).subscribe(
      response => {
        const blob = new Blob([response], { type: fileType === 'pdf' ? 'application/pdf' : 'image/png' });
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `${receiptNumber}.${fileType}`;
        a.click();
      },
      error => {
        this.showAlert(`El comprobante no está disponible. El archivo ${receiptNumber}.${fileType} no se encontró en el servidor.`);
      }
    );
  }

  showAlert(message: string) {
    alert(message);
  }

  navigateToInicioAdministrador() {
    this.router.navigate(['/administrador'], { queryParams: { usuarioAdministrador: this.usuarioAdministrador } });
  }

  navigateToAdministarCuentas() {
    this.router.navigate(['/administrador/accounts'], { queryParams: { usuarioAdministrador: this.usuarioAdministrador } });
  }

  navigateToAdministrarUsuarios() {
    this.router.navigate(['/administrador/users'], { queryParams: { usuarioAdministrador: this.usuarioAdministrador } });
  }

  navigateToDepositos() {
    this.router.navigate(['/administrador/deposito'], { queryParams: { usuarioAdministrador: this.usuarioAdministrador } });
  }

  navigateToTranferencias() {
    this.router.navigate(['/administrador/transferencias'], { queryParams: { usuarioAdministrador: this.usuarioAdministrador } });
  }
}
