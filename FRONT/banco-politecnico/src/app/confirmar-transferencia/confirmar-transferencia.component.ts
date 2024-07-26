import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferService } from '../services/transfer.service';
import { ComprobanteService } from '../services/comprobante.service';
import { AccountService } from '../services/account.service';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuarioDataTransferenciaService } from '../services/usuario-data-transferencia.service';

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
  saldoAntesBeneficiario: number | undefined;
  tipoCuentaBeneficiario: string | undefined;

  correoElectronico: string | undefined;
  numeroTelefono: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transferService: TransferService,
    private comprobanteService: ComprobanteService,
    private accountService: AccountService,
    private http: HttpClient,
    private usuarioDataTransferenciaService: UsuarioDataTransferenciaService
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
      this.saldoAntesBeneficiario = parseFloat(params['saldoAntesBeneficiario']);
      this.tipoCuentaBeneficiario = params['tipoCuentaBeneficiario'];

      // Obtener la información del usuario
      this.obtenerInformacionUsuario(this.usuario);
    });
  }

  obtenerInformacionUsuario(usuario: string | undefined): void {
    if (usuario) {
      this.accountService.obtenerUsuario(usuario).subscribe(
        data => {
          if (data && data.usuario) {
            this.correoElectronico = data.usuario.correo_electronico;
            this.numeroTelefono = data.usuario.numero_telefono;

            // Almacenar datos del usuario en el servicio compartido
            const usuarioData = {
              correo_electronico: this.correoElectronico,
              numero_telefono: this.numeroTelefono,
            };
        
            // Almacenar datos del usuario en el servicio compartido
            this.usuarioDataTransferenciaService.setUsuarioData(usuarioData);

            console.log('Correo Electrónico:', this.correoElectronico);
            console.log('Número de Teléfono:', this.numeroTelefono);
          } else {
            console.log('No se encontró la información del usuario.');
          }
        },
        error => {
          console.error('Error al obtener la información del usuario:', error);
        }
      );
    }
  }

  async confirmTransfer(): Promise<void> {
    if (this.amount && this.saldo && this.amount <= this.saldo) {
      try {
        if (!this.correoElectronico || !this.numeroTelefono) {
          throw new Error('No se pudo obtener el correo electrónico o el número de teléfono del usuario.');
        }

        // Envía el código de seguridad
        this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email: this.correoElectronico, phoneNumber: this.numeroTelefono }).subscribe(
          (response: any) => {
            console.log('Código de seguridad enviado:', response);
            // Navega a verificar transferencia con los datos actuales
            this.router.navigate(['/verificar-transferencia'], {
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
                saldoAntesBeneficiario: this.saldoAntesBeneficiario,
                tipoCuentaBeneficiario: this.tipoCuentaBeneficiario,
                email: this.correoElectronico,
                phoneNumber: this.numeroTelefono
              }
            });
          },
          (error) => {
            console.error('Error al enviar el código de seguridad:', error);
          }
        );
      } catch (error) {
        console.error('Error al confirmar la transferencia', error);
      }
    } else {
      alert('El monto de la transferencia no puede ser mayor que el saldo de la cuenta.');
    }
  }

    /*async confirmTransfer(): Promise<void> {
      if (this.amount && this.saldo && this.amount <= this.saldo) {
        try {
          if (!this.correoElectronico || !this.numeroTelefono) {
            throw new Error('No se pudo obtener el correo electrónico o el número de teléfono del usuario.');
          }
    
          // Primer envío del código de seguridad
          this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email: this.correoElectronico, phoneNumber: this.numeroTelefono }).subscribe(
            (response: any) => {
              console.log('Primer código de seguridad enviado:', response);
    
              // Reenvío automático del código de seguridad
              this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email: this.correoElectronico, phoneNumber: this.numeroTelefono }).subscribe(
                (secondResponse: any) => {
                  console.log('Segundo código de seguridad enviado:', secondResponse);
    
                  // Navega a verificar transferencia con los datos actuales
                  this.router.navigate(['/verificar-transferencia'], {
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
                      saldoAntesBeneficiario: this.saldoAntesBeneficiario,
                      tipoCuentaBeneficiario: this.tipoCuentaBeneficiario,
                      email: this.correoElectronico,
                      phoneNumber: this.numeroTelefono
                    }
                  });
                },
                (error) => {
                  console.error('Error al reenviar el código de seguridad:', error);
                }
              );
            },
            (error) => {
              console.error('Error al enviar el primer código de seguridad:', error);
            }
          );
        } catch (error) {
          console.error('Error al confirmar la transferencia', error);
        }
      } else {
        alert('El monto de la transferencia no puede ser mayor que el saldo de la cuenta.');
      }
    }*/
    

  /*  async confirmTransfer(): Promise<void> {
      if (this.amount && this.saldo && this.amount <= this.saldo) {
        try {
          const saldoDespuesOrigen = this.saldo - this.amount;
          const saldoAntesDestino = this.saldoAntesBeneficiario!;
          const saldoDespuesDestino = saldoAntesDestino + this.amount;
  
          // Actualiza saldo cuenta de origen
          await firstValueFrom(this.transferService.updateAccountBalance(this.numeroCuenta!, saldoDespuesOrigen));
  
          // Actualiza saldo cuenta de destino
          await firstValueFrom(this.transferService.updateAccountBalance(this.contactNumber!, saldoDespuesDestino));
  
          // Guarda transferencia y comprobante
          const transferData = {
            numero_comprobante_transferencia: this.generateComprobanteNumber(),
            monto: this.amount,
            fecha: new Date(),
            cuenta_origen: {
              nombre_completo: this.cuentaNombre,
              numero_cuenta: this.numeroCuenta,
              tipoCuenta: this.tipoCuenta,
              tipoTransaccion: 'Egreso',
              saldoAntes: this.saldo,
              saldoDespues: saldoDespuesOrigen
            },
            cuenta_destino: {
              nombre_completo: this.contactName,
              numero_cuenta: this.contactNumber,
              tipoCuenta: this.tipoCuentaBeneficiario,
              tipoTransaccion: 'Ingreso',
              saldoAntes: saldoAntesDestino,
              saldoDespues: saldoDespuesDestino
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
              saldo: saldoDespuesOrigen,
              amount: this.amount,
              usuario: this.usuario,
              numeroIdentidad: this.numeroIdentidad,
              contactName: this.contactName,
              contactNumber: this.contactNumber,
              comment: this.comment,
              numero_comprobante_transferencia: transferData.numero_comprobante_transferencia,
              id_comprobante_transferencia: transferData.id_comprobante_transferencia,
              fecha: new Date(),
              saldoAntesBeneficiario: this.saldoAntesBeneficiario,
              tipoCuentaBeneficiario: this.tipoCuentaBeneficiario
            }
          });
        } catch (error) {
          console.error('Error al confirmar la transferencia', error);
        }
      } else {
        alert('El monto de la transferencia no puede ser mayor que el saldo de la cuenta.');
      }
    }*/

    navigateToVerificarTransferencia(): void {
      this.router.navigate(['/verificar-transferencia'], {
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
          saldoAntesBeneficiario: this.saldoAntesBeneficiario,
          tipoCuentaBeneficiario: this.tipoCuentaBeneficiario
        }
      });
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

    generateComprobanteNumber(): string {
      return Math.floor(10000000 + Math.random() * 90000000).toString();
    }

  generateComprobanteID(): string {
    return 'ID-' + Math.floor(Math.random() * 1000000);
  }

  cancelTransfer(): void {
    this.router.navigate(['/inicio'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.numeroIdentidad } });
  }

  goBack(): void {
    window.history.back();
  }
}
