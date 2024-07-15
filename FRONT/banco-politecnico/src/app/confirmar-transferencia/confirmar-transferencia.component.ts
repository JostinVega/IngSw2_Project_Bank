/*import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferService } from '../services/transfer.service';
import { ComprobanteService } from '../services/comprobante.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-confirmar-transferencia',
  templateUrl: './confirmar-transferencia.component.html',
  styleUrls: ['./confirmar-transferencia.component.css']
})
export class ConfirmarTransferenciaComponent implements OnInit {
  cuentaNombre: string | undefined;
  numeroCuenta: string | undefined;
  tipoCuenta: string | undefined;
  saldo: number | undefined;
  amount: number | undefined;
  usuario: string | undefined;
  numeroIdentidad: string | undefined;
  contactName: string | undefined;
  contactNumber: string | undefined;
  comment: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transferService: TransferService,
    private comprobanteService: ComprobanteService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cuentaNombre = params['cuentaNombre'];
      this.numeroCuenta = params['numeroCuenta'];
      this.tipoCuenta = params['tipoCuenta'];
      this.saldo = parseFloat(params['saldo']);
      this.amount = parseFloat(params['amount']);
      this.usuario = params['usuario'];
      this.numeroIdentidad = params['numeroIdentidad'];
      this.contactName = params['contactName'];
      this.contactNumber = params['contactNumber'];
      this.comment = params['comment'];
    });
  }

  async confirmTransfer(): Promise<void> {
    if (this.amount && this.saldo && this.amount <= this.saldo) {
      try {
        // Resta el monto de la cuenta de origen
        console.log('Actualizando saldo para cuenta de origen:', this.numeroCuenta, 'Nuevo saldo:', this.saldo - this.amount);
        await firstValueFrom(this.transferService.updateAccountBalance(this.numeroCuenta!, this.saldo - this.amount));

        // Obtiene el saldo actual del beneficiario y suma el monto
        const beneficiaryAccount = await firstValueFrom(this.transferService.getAccountByNumber(this.contactNumber!));
        console.log('Información de cuenta del beneficiario:', beneficiaryAccount);
        
        // Accedemos a la propiedad 'cuenta' y luego a 'saldo'
        const beneficiaryBalance = parseFloat(beneficiaryAccount.cuenta.saldo);
        console.log('Saldo actual del beneficiario:', beneficiaryBalance);
        
        await firstValueFrom(this.transferService.updateAccountBalance(this.contactNumber!, beneficiaryBalance + this.amount));

        // Crea el número de comprobante y guarda la transferencia
        const transferData = {
          numero_comprobante_transferencia: this.generateComprobanteNumber(),
          monto: this.amount,
          fecha: new Date(),
          cuenta_origen: {
            nombre_completo: this.cuentaNombre,
            numero_cuenta: this.numeroCuenta
          },
          cuenta_destino: {
            nombre_completo: this.contactName,
            numero_cuenta: this.contactNumber
          },
          comentario: this.comment,
          numero_cuenta: this.numeroCuenta,
          id_comprobante_transferencia: this.generateComprobanteID()
        };

        await firstValueFrom(this.transferService.saveTransfer(transferData));

        // Guarda el comprobante de transferencia
        await firstValueFrom(this.comprobanteService.saveComprobante({
          id_comprobante_transferencia: transferData.id_comprobante_transferencia,
          fecha_emision: new Date(),
          archivo_comprobante_transferencia: 'comprobante.pdf',
          numero_comprobante_transferencia: transferData.numero_comprobante_transferencia
        }));

        // Navega a la pantalla de comprobante
        this.router.navigate(['/comprobante-transferencia'], {
          queryParams: {
            cuentaNombre: this.cuentaNombre,
            numeroCuenta: this.numeroCuenta,
            tipoCuenta: this.tipoCuenta,
            saldo: this.saldo,
            amount: this.amount,
            usuario: this.usuario,
            numeroIdentidad: this.numeroIdentidad,
            contactName: this.contactName,
            contactNumber: this.contactNumber,
            comment: this.comment,
            numero_comprobante_transferencia: transferData.numero_comprobante_transferencia,
            id_comprobante_transferencia: transferData.id_comprobante_transferencia,
            fecha: new Date()
          }
        });
      } catch (error) {
        console.error('Error al confirmar la transferencia', error);
      }
    } else {
      alert('El monto de la transferencia no puede ser mayor que el saldo de la cuenta.');
    }
  }

  generateComprobanteNumber(): string {
    return 'CT-' + Math.floor(Math.random() * 1000000);
  }

  generateComprobanteID(): string {
    return 'ID-' + Math.floor(Math.random() * 1000000);
  }

  cancelTransfer(): void {
    this.router.navigate(['/']);
  }

  goBack(): void {
    this.router.navigate(['/agregar-comentario']);
  }
}
*/




import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferService } from '../services/transfer.service';
import { ComprobanteService } from '../services/comprobante.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-confirmar-transferencia',
  templateUrl: './confirmar-transferencia.component.html',
  styleUrls: ['./confirmar-transferencia.component.css']
})
export class ConfirmarTransferenciaComponent implements OnInit {
  cuentaNombre: string | undefined;
  numeroCuenta: string | undefined;
  tipoCuenta: string | undefined;
  saldo: number | undefined;
  amount: number | undefined;
  usuario: string | undefined;
  numeroIdentidad: string | undefined;
  contactName: string | undefined;
  contactNumber: string | undefined;
  comment: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transferService: TransferService,
    private comprobanteService: ComprobanteService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cuentaNombre = params['cuentaNombre'];
      this.numeroCuenta = params['numeroCuenta'];
      this.tipoCuenta = params['tipoCuenta'];
      this.saldo = parseFloat(params['saldo']);
      this.amount = parseFloat(params['amount']);
      this.usuario = params['usuario'];
      this.numeroIdentidad = params['numeroIdentidad'];
      this.contactName = params['contactName'];
      this.contactNumber = params['contactNumber'];
      this.comment = params['comment'];
    });
  }

  async confirmTransfer(): Promise<void> {
    if (this.amount && this.saldo && this.amount <= this.saldo) {
      try {
        // Actualiza saldo cuenta de origen
        await firstValueFrom(this.transferService.updateAccountBalance(this.numeroCuenta!, this.saldo - this.amount));

        // Obtiene saldo beneficiario y suma el monto
        const beneficiaryAccount = await firstValueFrom(this.transferService.getAccountByNumber(this.contactNumber!));
        const beneficiaryBalance = parseFloat(beneficiaryAccount.cuenta.saldo);
        await firstValueFrom(this.transferService.updateAccountBalance(this.contactNumber!, beneficiaryBalance + this.amount));

        // Guarda transferencia y comprobante
        const transferData = {
          numero_comprobante_transferencia: this.generateComprobanteNumber(),
          monto: this.amount,
          fecha: new Date(),
          cuenta_origen: {
            nombre_completo: this.cuentaNombre,
            numero_cuenta: this.numeroCuenta
          },
          cuenta_destino: {
            nombre_completo: this.contactName,
            numero_cuenta: this.contactNumber
          },
          comentario: this.comment,
          numero_cuenta: this.numeroCuenta,
          id_comprobante_transferencia: this.generateComprobanteID()
        };

        await firstValueFrom(this.transferService.saveTransfer(transferData));
        await firstValueFrom(this.comprobanteService.saveComprobante({
          id_comprobante_transferencia: transferData.id_comprobante_transferencia,
          fecha_emision: new Date(),
          archivo_comprobante_transferencia: 'comprobante.pdf',
          numero_comprobante_transferencia: transferData.numero_comprobante_transferencia
        }));

        // Navega a verificar-transferencia con los datos actuales
        this.router.navigate(['/comprobante-transferencia'], {
          queryParams: {
            cuentaNombre: this.cuentaNombre,
            numeroCuenta: this.numeroCuenta,
            tipoCuenta: this.tipoCuenta,
            saldo: this.saldo,
            amount: this.amount,
            usuario: this.usuario,
            numeroIdentidad: this.numeroIdentidad,
            contactName: this.contactName,
            contactNumber: this.contactNumber,
            comment: this.comment,
            numero_comprobante_transferencia: transferData.numero_comprobante_transferencia,
            id_comprobante_transferencia: transferData.id_comprobante_transferencia,
            fecha: new Date()
          }
        });
      } catch (error) {
        console.error('Error al confirmar la transferencia', error);
      }
    } else {
      alert('El monto de la transferencia no puede ser mayor que el saldo de la cuenta.');
    }
  }

  generateComprobanteNumber(): string {
    return 'CT-' + Math.floor(Math.random() * 1000000);
  }

  generateComprobanteID(): string {
    return 'ID-' + Math.floor(Math.random() * 1000000);
  }

  cancelTransfer(): void {
    this.router.navigate(['/']);
  }

  goBack(): void {
    this.router.navigate(['/agregar-comentario']);
  }
}
