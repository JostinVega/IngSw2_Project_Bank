import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { AccountService } from '../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
//AGREGAR
import { HttpClient } from '@angular/common/http'; // Asegúrate de importar HttpClient

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
  selector: 'app-historial-transacciones',
  templateUrl: './historial-transacciones.component.html',
  styleUrls: ['./historial-transacciones.component.css']
})
export class HistorialTransaccionesComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  accounts: string[] = [];
  searchAccount: string = '';
  searchAccountType: string = '';
  searchDateFrom: string = '';
  searchDateTo: string = '';
  searchType: string = '';
  usuario: string = '';
  numeroIdentidad: string = '';
  numeroCuenta: string = '';

  //AGREGAR***
  //private downloadUrl = 'http://localhost:4001/download-comprobante/';
  //private downloadUrl = 'http://localhost:4001/assets/comprobantes/';


  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private accountService: AccountService,
              private http: HttpClient, // Asegúrate de inyectar HttpClient
              private backendService: BackendService
            ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
      this.numeroIdentidad = params['numeroIdentidad'];
      console.log('Parametros recibidos:', {
        usuario: this.usuario,
        numeroIdentidad: this.numeroIdentidad
      });
      if (this.usuario) {
        this.fetchAccounts(this.usuario);
      } else {
        console.error('Numero de Identidad no disponible');
      }
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
      // Ajustar la fecha "Hasta" para incluir todo el día
      dateTo.setHours(23, 59, 59, 999);
    }
    
    this.filteredTransactions = this.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const matchesAccount = this.numeroCuenta ? transaction.account === this.numeroCuenta : true;
      const matchesAccountType = this.searchAccountType ? transaction.accountType.toLowerCase() === this.searchAccountType.toLowerCase() : true;
      const matchesDateFrom = dateFrom ? transactionDate >= dateFrom : true;
      const matchesDateTo = dateTo ? transactionDate <= dateTo : true;
      const matchesType = this.searchType ? transaction.type.toLowerCase() === this.searchType.toLowerCase() : true;
      return matchesAccount && matchesAccountType && matchesDateFrom && matchesDateTo && matchesType;
    });
  }

  fetchAccounts(usuario: string): void {
    this.accountService.getUserAccounts(usuario).subscribe(
      data => {
        console.log('Cuentas recibidas:', data);
        this.accounts = data.cuentas.map((account: any) => account.cuentaNombre);
      },
      error => {
        console.error('Error fetching accounts:', error);
      }
    );
  }

  onAccountChange(cuentaNombre: string): void {
    this.getNumeroCuenta(cuentaNombre);
  }

  getNumeroCuenta(cuentaNombre: string): void {
    this.accountService.getNumeroCuenta(cuentaNombre).subscribe(
      data => {
        this.numeroCuenta = data.numeroCuenta;
        console.log('Numero de Cuenta recibido:', data.numeroCuenta);
        this.getTransferencias(this.numeroCuenta);
      },
      error => {
        console.error('Error fetching numeroCuenta:', error);
      }
    );
  }

  //MODIFICAR
  //SE MODIFICO LO DE CONVERTIR A NUMERO PARA PODER DESCARGARSE EN PDF 03/08/24
  getTransferencias(numeroCuenta: string): void {
    this.accountService.getTransferenciasByNumeroCuenta(numeroCuenta).subscribe(
      data => {
        console.log('Transferencias recibidas:', data.transferencias);
        if (data.transferencias.length > 0) {
          this.transactions = data.transferencias.map((trans: any) => {
            if (trans.cuenta_origen.numero_cuenta === numeroCuenta) {
              return {
                date: trans.fecha,
                //amount: trans.monto,
                amount: parseFloat(trans.monto), // Convertir a número
                beneficiary: trans.cuenta_destino.nombre_completo,
                type: 'Egreso',
                description: trans.comentario || '',
                //balanceBefore: trans.cuenta_origen.saldoAntes,
                //balanceAfter: trans.cuenta_origen.saldoDespues,
                balanceBefore: parseFloat(trans.cuenta_origen.saldoAntes), // Convertir a número
                balanceAfter: parseFloat(trans.cuenta_origen.saldoDespues), // Convertir a número
                account: trans.cuenta_origen.numero_cuenta,
                accountType: trans.cuenta_destino.tipoCuenta,
                receiptNumber: trans.numero_comprobante_transferencia
              };
            } else {
              return {
                date: trans.fecha,
                //amount: trans.monto,
                amount: parseFloat(trans.monto), // Convertir a número
                beneficiary: trans.cuenta_origen.nombre_completo,
                type: 'Ingreso',
                description: trans.comentario || '',
                //balanceBefore: trans.cuenta_destino.saldoAntes,
                //balanceAfter: trans.cuenta_destino.saldoDespues,
                balanceBefore: parseFloat(trans.cuenta_destino.saldoAntes), // Convertir a número
                balanceAfter: parseFloat(trans.cuenta_destino.saldoDespues), // Convertir a número
                account: trans.cuenta_destino.numero_cuenta,
                accountType: trans.cuenta_origen.tipoCuenta,
                receiptNumber: trans.numero_comprobante_transferencia
              };
            }
          });
        } else {
          this.transactions = []; // Vaciar la lista de transacciones si no hay resultados
        }
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



  //MODIFICAR
  //SE MODIFICO 03/08/2024
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

  //MODIFICAR
  //SE MODIFICO 03/08/24
  showAlert(message: string) {
    alert(message);
  }
  navigateToTransfer(): void {
    this.router.navigate(['/transferencia'], { queryParams: { usuario: this.usuario } });
  }

  navigateToNewAccount(): void {
    const numeroIdentidad = this.numeroIdentidad;
    if (numeroIdentidad) {
      this.accountService.getUserInfo(numeroIdentidad).subscribe(
        userInfo => {
          const email = userInfo.correo_electronico;
          const phoneNumber = userInfo.numero_telefono;
          //if (email && phoneNumber) {
            //this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber }).subscribe(
          if (email && phoneNumber) {
            this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber}).subscribe(
              (response: any) => {
                console.log('Código de seguridad enviado:', response);
                this.router.navigate(['/verificar-crear-cuenta'], { queryParams: { usuario: this.usuario, numeroIdentidad, email, phoneNumber} });
              },
              (error) => {
                console.error('Error al enviar el código de verificación:', error);
              }
            );
          } else {
            console.error('Email o número de teléfono no disponible');
          }
        },
        error => {
          console.error('Error fetching user info:', error);
        }
      );
    } else {
      console.error('Número de Identidad no disponible');
    }
  }

    /*navigateToNewAccount(): void {
      const numeroIdentidad = this.numeroIdentidad;
      if (numeroIdentidad) {
        this.accountService.getUserInfo(numeroIdentidad).subscribe(
          userInfo => {
            const email = userInfo.correo_electronico;
            const phoneNumber = userInfo.numero_telefono;
            if (email && phoneNumber) {
              // Primer envío del código de verificación
              this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber }).subscribe(
                (response: any) => {
                  console.log('Primer código de seguridad enviado:', response);
    
                  // Reenvío automático del código de verificación
                  this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber }).subscribe(
                    (secondResponse: any) => {
                      console.log('Segundo código de seguridad enviado:', secondResponse);
                      this.router.navigate(['/verificar-crear-cuenta'], { queryParams: { usuario: this.usuario, numeroIdentidad, email, phoneNumber } });
                    },
                    (error) => {
                      console.error('Error al reenviar el código de verificación:', error);
                    }
                  );
                },
                (error) => {
                  console.error('Error al enviar el primer código de verificación:', error);
                }
              );
            } else {
              console.error('Email o número de teléfono no disponible');
            }
          },
          error => {
            console.error('Error fetching user info:', error);
          }
        );
      } else {
        console.error('Número de Identidad no disponible');
      }
    }*/
    

  navigateToVerUsuario(): void {
    this.router.navigate(['/ver-perfil'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.numeroIdentidad } });
  }

  navigateToActualizarInformacion(): void {
    const numeroIdentidad = this.numeroIdentidad;
    console.log(numeroIdentidad);
    if (numeroIdentidad) {
      this.router.navigate(['/actualizar-informacion'], { queryParams: { numeroIdentidad, usuario: this.usuario} });
    } else {
      console.error('Numero de Identidad no disponible');
    }
  }

  navigateToFAQ(): void {
    this.router.navigate(['/faq'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.numeroIdentidad } });
  }

  navigateToContactarSoporte(): void {
    this.router.navigate(['/contactar-soporte'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.numeroIdentidad } });
  }

  navigateToInicio(): void {
    this.router.navigate(['/inicio'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.numeroIdentidad } });
  }

  navigateToChangePassword(): void {
    const numeroIdentidad = this.numeroIdentidad;
    if (numeroIdentidad) {
      this.router.navigate(['/change-password'], { queryParams: { numeroIdentidad, usuario: this.usuario} });
    } else {
      console.error('Numero de Identidad no disponible');
    }
  }

  navigateToHistorialTransacciones(): void {
    const numeroIdentidad = this.numeroIdentidad;
    if (this.usuario && numeroIdentidad) {
      console.log('Navegando a historial-transacciones con:', {
        usuario: this.usuario,
        numeroIdentidad: numeroIdentidad
      });
      this.router.navigate(['/historial-transacciones'], {
        queryParams: {
          usuario: this.usuario,
          numeroIdentidad: numeroIdentidad
        }
      });
    } else {
      console.error('Usuario o Numero de Identidad no disponible');
    }
  }

  navigateToAddContact(): void{
    const numeroIdentidad = this.numeroIdentidad;
    if (numeroIdentidad) {
      this.router.navigate(['/crear-contactos'], { queryParams: { numeroIdentidad, usuario: this.usuario} });
    } else {
      console.error('Numero de Identidad no disponible');
    }
  }


  //AGREGAR
  //SE AGREGO 03/08/24
  /*
  downloadFile(receiptNumber: string, fileType: string) {
    const url = `${this.downloadUrl}${receiptNumber}.${fileType}`;
    this.http.get(url, { responseType: 'blob' }).subscribe(
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
    */

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

 
  
}
