import { Component } from '@angular/core';
import { AdministradorService } from 'src/app/services/administrador.service';
import { TransferService } from '../services/transfer.service';
import { firstValueFrom } from 'rxjs';
import { ComprobanteService } from '../services/comprobante.service';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service'; // Importa el servicio del backend
import { AccountService } from '../services/account.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-realizar-deposito',
  templateUrl: './realizar-deposito.component.html',
  styleUrls: ['./realizar-deposito.component.css']
})
export class RealizarDepositoComponent {
  numeroCuenta: string | undefined;
  tipoCuenta: string | undefined;
  saldo: number | undefined;
  amount: number | undefined;
  usuario: string | undefined;
  numeroIdentidad: string | undefined;

  nombrePropietario: string | undefined;

  cuentaErrorMessage: string = '';
  amountErrorMessage: string = '';

  comprobante: string = this.generateComprobanteNumber();

  cuentaOrigen = {
    nombre: '',
    numeroCuenta: ''
  };

  constructor(
    private administradorService: AdministradorService,
    private transferService: TransferService,
    private comprobanteService: ComprobanteService,
    private router: Router,
    private backendService: BackendService, // Inyecta el servicio del backend
    private accountService: AccountService,
    private cdr: ChangeDetectorRef // Inyecta ChangeDetectorRef aquí
  ) {}

  onCuentaBlur() {
    if (this.numeroCuenta) {
      this.administradorService.getCuentaByNumeroCuent(this.numeroCuenta).subscribe(
        (cuenta: any) => {
          this.tipoCuenta = cuenta.tipoCuenta;
          this.saldo = cuenta.saldo;
          this.numeroIdentidad = cuenta.numeroIdentidad;
          this.cuentaErrorMessage = '';

          // Obtener el usuario con el numeroIdentidad
          this.administradorService.getUsuarioByNumeroIdentidad(this.numeroIdentidad!).subscribe(
            (response: any) => {
              this.usuario = response.usuario.usuario; // Ajusta según tu modelo
            },
            (error) => {
              console.error('Error al obtener el usuario:', error);
              this.cuentaErrorMessage = 'Error al obtener el usuario asociado a la cuenta.';
              this.usuario = '';
            }
          );
        },
        (error) => {
          console.error('Error al obtener la cuenta:', error);
          this.cuentaErrorMessage = 'El número de cuenta no existe en la base de datos.';
          this.usuario = '';
          this.tipoCuenta = '';
          this.numeroIdentidad = '';
          this.saldo = undefined;
        }
      );
    }
  }

  validateAmount() {
    if (this.amount! <= 1 || this.amount! > 15000) {
      this.amountErrorMessage = 'El monto debe ser mayor a 1 y menor a 15000.';
    } else {
      this.amountErrorMessage = '';
    }
  }

  /*async onSubmit() {
    this.validateAmount();

    if (!this.numeroCuenta || !this.amount || this.amountErrorMessage || this.cuentaErrorMessage) {
      console.error('Formulario no válido');
      return;
    }

    try {
      const saldoDespues = this.saldo! + this.amount!;

      // Actualiza el saldo de la cuenta destino
      await firstValueFrom(this.transferService.updateAccountBalance(this.numeroCuenta!, saldoDespues));

      // Genera y guarda la transferencia en la base de datos
      const transferData = {
        numero_comprobante_transferencia: this.generateComprobanteNumber(),
        monto: this.amount,
        fecha: new Date(),
        cuenta_destino: {
          nombre_completo: this.usuario,
          numero_cuenta: this.numeroCuenta,
          tipoCuenta: this.tipoCuenta,
          tipoTransaccion: 'Ingreso',
          saldoAntes: this.saldo,
          saldoDespues: saldoDespues
        },
        comentario: 'Depósito realizado'
      };

      await firstValueFrom(this.transferService.saveTransfer(transferData));

      // Genera y guarda el comprobante de transferencia
      await firstValueFrom(this.comprobanteService.saveComprobante({
        id_comprobante_transferencia: this.generateComprobanteID(),
        fecha_emision: new Date(),
        archivo_comprobante_transferencia: 'comprobante.pdf',
        numero_comprobante_transferencia: transferData.numero_comprobante_transferencia
      }));

      // Navega a la página de confirmación
      /*this.router.navigate(['/comprobante-transferencia'], {
        queryParams: {
          cuentaNombre: this.usuario,
          numeroCuenta: this.numeroCuenta,
          tipoCuenta: this.tipoCuenta,
          saldo: saldoDespues,
          amount: this.amount,
          usuario: this.usuario,
          numeroIdentidad: this.numeroIdentidad
        }
      });*/
    /*} catch (error) {
      console.error('Error al realizar el depósito:', error);
      alert('Hubo un error al realizar el depósito.');
    }
  }*/

  /*onSubmit() {
    if (!this.numeroCuenta || !this.amount || this.amountErrorMessage || this.cuentaErrorMessage) {
      console.error('Formulario no válido');
      return;
    }
  
    if (this.amount && this.saldo) {
      try {
        const saldoDespuesOrigen = this.saldo - this.amount;
        const saldoAntesDestino = this.saldo || 0;
        const saldoDespuesDestino = saldoAntesDestino + this.amount;
  
        // Crea el objeto de datos de la transferencia
        const transferData = {
          numero_comprobante_transferencia: this.generateComprobanteNumber(),
          monto: this.amount,
          fecha: new Date(),
          cuenta_origen: {
            nombre_completo: 'Cajero',
            numero_cuenta: '000000000',
            tipoCuenta: 'Cajero',
            tipoTransaccion: 'Egreso',
            saldoAntes: this.amount,
            saldoDespues: '0'
          },
          cuenta_destino: {
            nombre_completo: this.usuario,
            numero_cuenta: this.numeroCuenta,
            tipoCuenta: this.tipoCuenta,
            tipoTransaccion: 'Ingreso',
            saldoAntes: this.saldo,
            saldoDespues: saldoDespuesDestino
          },
          comentario: 'Depósito realizado',
          numero_cuenta: this.numeroCuenta,
          id_comprobante_transferencia: this.generateComprobanteID()
        };
  
        // Llamada al servicio para guardar la transferencia
        this.transferService.saveTransfer(transferData).subscribe(
          response => {
            console.log('Transferencia guardada con éxito:', response);
            alert('Transferencia realizada exitosamente.');
            // Redirigir o realizar alguna acción adicional tras la transferencia exitosa
          },
          error => {
            console.error('Error al guardar la transferencia:', error);
            alert('Hubo un error al intentar realizar la transferencia.');
          }
        );
      } catch (error) {
        console.error('Error al realizar la transferencia:', error);
        alert('Error al realizar la transferencia.');
      }
    } else {
      alert('El monto de la transferencia no puede ser mayor que el saldo de la cuenta.');
    }
  }*/

  /*onSubmit() {
    if (!this.numeroCuenta || !this.amount || this.amountErrorMessage || this.cuentaErrorMessage) {
      console.error('Formulario no válido');
      return;
    }
  
    if (this.amount && this.saldo) {
      try {
        // Convertir los valores a números para asegurarse de que no se concatenen
        const saldoActual = Number(this.saldo);
        const montoDeposito = Number(this.amount);
  
        const saldoDespuesDestino = saldoActual + montoDeposito;

        
  
        // Crea el objeto de datos de la transferencia
        const transferData = {
          numero_comprobante_transferencia: this.generateComprobanteNumber(),
          monto: montoDeposito,
          fecha: new Date(),
          cuenta_origen: {
            nombre_completo: 'Cajero',
            numero_cuenta: '000000000',
            tipoCuenta: 'Cajero',
            tipoTransaccion: 'Egreso',
            saldoAntes: montoDeposito,
            saldoDespues: 0
          },
          cuenta_destino: {
            nombre_completo: this.usuario,
            numero_cuenta: this.numeroCuenta,
            tipoCuenta: this.tipoCuenta,
            tipoTransaccion: 'Ingreso',
            saldoAntes: saldoActual,
            saldoDespues: saldoDespuesDestino
          },
          comentario: 'Depósito realizado',
          numero_cuenta: this.numeroCuenta,
          id_comprobante_transferencia: this.generateComprobanteID()
        };
  
        // Llamada al servicio para guardar la transferencia
        this.transferService.saveTransfer(transferData).subscribe(
          response => {
            console.log('Transferencia guardada con éxito:', response);
            alert('Transferencia realizada exitosamente.');
            // Redirigir o realizar alguna acción adicional tras la transferencia exitosa
          },
          error => {
            console.error('Error al guardar la transferencia:', error);
            alert('Hubo un error al intentar realizar la transferencia.');
          }
        );
      } catch (error) {
        console.error('Error al realizar la transferencia:', error);
        alert('Error al realizar la transferencia.');
      }
    } else {
      alert('El monto de la transferencia no puede ser mayor que el saldo de la cuenta.');
    }
  }*/

  /*onSubmit() {
    if (!this.numeroCuenta || !this.amount || this.amountErrorMessage || this.cuentaErrorMessage) {
      console.error('Formulario no válido');
      return;
    }
  
    if (this.amount && this.saldo) {
      try {
        // Convertir los valores a números para asegurarse de que no se concatenen
        const saldoActual = Number(this.saldo);
        const montoDeposito = Number(this.amount);
  
        const saldoDespuesDestino = saldoActual + montoDeposito;
  
        // Crea el objeto de datos de la transferencia
        const transferData = {
          numero_comprobante_transferencia: this.generateComprobanteNumber(),
          monto: montoDeposito,
          fecha: new Date(),
          cuenta_origen: {
            nombre_completo: 'Cajero',
            numero_cuenta: '000000000',
            tipoCuenta: 'Cajero',
            tipoTransaccion: 'Egreso',
            saldoAntes: montoDeposito,
            saldoDespues: 0
          },
          cuenta_destino: {
            nombre_completo: this.usuario,
            numero_cuenta: this.numeroCuenta,
            tipoCuenta: this.tipoCuenta,
            tipoTransaccion: 'Ingreso',
            saldoAntes: saldoActual,
            saldoDespues: saldoDespuesDestino
          },
          comentario: 'Depósito realizado',
          numero_cuenta: this.numeroCuenta,
          id_comprobante_transferencia: this.generateComprobanteID()
        };
  
        // Llamada al servicio para guardar la transferencia
        this.transferService.saveTransfer(transferData).subscribe(
          response => {
            console.log('Transferencia guardada con éxito:', response);
            
            // Después de guardar la transferencia, actualiza el saldo de la cuenta
            this.transferService.updateAccountBalance(this.numeroCuenta!, saldoDespuesDestino).subscribe(
              updateResponse => {
                console.log('Saldo de la cuenta actualizado con éxito:', updateResponse);
                alert('Transferencia realizada exitosamente y saldo actualizado.');
                // Redirigir o realizar alguna acción adicional tras la transferencia exitosa
                this.generateAndUploadComprobante();
              },
              updateError => {
                console.error('Error al actualizar el saldo de la cuenta:', updateError);
                alert('Transferencia realizada, pero hubo un error al actualizar el saldo.');
              }
            );
          },
          error => {
            console.error('Error al guardar la transferencia:', error);
            alert('Hubo un error al intentar realizar la transferencia.');
          }
        );
      } catch (error) {
        console.error('Error al realizar la transferencia:', error);
        alert('Error al realizar la transferencia.');
      }
    } else {
      alert('El monto de la transferencia no puede ser mayor que el saldo de la cuenta.');
    }
  }*/

  onSubmit() {
    if (!this.numeroCuenta || !this.amount || this.amountErrorMessage || this.cuentaErrorMessage) {
      console.error('Formulario no válido');
      return;
    }
  
    if (this.amount && this.saldo) {
      try {
        const saldoActual = Number(this.saldo);
        const montoDeposito = Number(this.amount);
  
        const saldoDespuesDestino = saldoActual + montoDeposito;
  
        const transferData = {
          numero_comprobante_transferencia: this.generateComprobanteNumber(),
          monto: montoDeposito,
          fecha: new Date(),
          cuenta_origen: {
            nombre_completo: 'Cajero',
            numero_cuenta: '000000000',
            tipoCuenta: 'Cajero',
            tipoTransaccion: 'Egreso',
            saldoAntes: montoDeposito,
            saldoDespues: 0
          },
          cuenta_destino: {
            nombre_completo: this.usuario,
            numero_cuenta: this.numeroCuenta,
            tipoCuenta: this.tipoCuenta,
            tipoTransaccion: 'Ingreso',
            saldoAntes: saldoActual,
            saldoDespues: saldoDespuesDestino
          },
          comentario: 'Depósito realizado',
          numero_cuenta: this.numeroCuenta,
          id_comprobante_transferencia: this.generateComprobanteID()
        };
  
        // Guardar la transferencia
        this.transferService.saveTransfer(transferData).subscribe(
          response => {
            console.log('Transferencia guardada con éxito:', response);
  
            // Actualizar saldo
            this.transferService.updateAccountBalance(this.numeroCuenta!, saldoDespuesDestino).subscribe(
              updateResponse => {
                console.log('Saldo de la cuenta actualizado con éxito:', updateResponse);
                alert('Transferencia realizada exitosamente y saldo actualizado.');
                
                // Generar y subir el comprobante
                this.generateAndUploadComprobante();
              },
              updateError => {
                console.error('Error al actualizar el saldo de la cuenta:', updateError);
                alert('Transferencia realizada, pero hubo un error al actualizar el saldo.');
              }
            );
          },
          error => {
            console.error('Error al guardar la transferencia:', error);
            alert('Hubo un error al intentar realizar la transferencia.');
          }
        );
      } catch (error) {
        console.error('Error al realizar la transferencia:', error);
        alert('Error al realizar la transferencia.');
      }
    } else {
      alert('El monto de la transferencia no puede ser mayor que el saldo de la cuenta.');
    }
  }
  
  
  obtenerNombrePropietario(usuario: string): void {
    this.accountService.getNombreCompleto(usuario).subscribe(
      data => {
        if (data && data.nombre_completo) {
          this.nombrePropietario = data.nombre_completo;
          console.log('Nombre del Propietario: ', this.nombrePropietario);
          this.cuentaOrigen.nombre = this.nombrePropietario || ''; // Asigna el nombre del propietario a cuentaOrigen.nombre, asegurando que no sea undefined
          this.cdr.detectChanges(); // Forzar la detección de cambios
        } else {
          console.log('No se encontró la información del propietario de la cuenta.');
        }
      },
      error => {
        console.error('Error al obtener la información del propietario de la cuenta:', error);
      }
    );
  }

 

  //SE AGREGO
  // En el método downloadPDF y downloadPNG
  
  generateAndUploadComprobante() {
    const data = document.getElementById('receipt');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 208;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let position = 0;
  
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        const pdfOutput = pdf.output('datauristring'); // Convertir PDF a base64
  
        const pdfBase64 = pdfOutput.split(',')[1]; // Extraer solo la parte base64
        const pngBase64 = imgData.split(',')[1];   // Extraer solo la parte base64
  
        // Enviar comprobante al backend
        this.backendService.uploadComprobante(this.comprobante, pdfBase64, pngBase64).subscribe(
          (response: any) => {
            console.log('Comprobante guardado exitosamente en la base de datos:', response);
          },
          (error: any) => {
            console.error('Error al guardar el comprobante en la base de datos:', error);
          }
        );
      });
    }
  }

  dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
  

  generateComprobanteNumber(): string {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  }

  generateComprobanteID(): string {
    return 'ID-' + Math.floor(Math.random() * 1000000);
  }
}
