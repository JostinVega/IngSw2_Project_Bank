import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CodigoService } from '../services/codigo.service';
import { TransferService } from '../services/transfer.service';
import { ComprobanteService } from '../services/comprobante.service';
import { AccountService } from '../services/account.service';
import { firstValueFrom } from 'rxjs';
import { BloqueoService } from '../services/bloqueo.service';

@Component({
  selector: 'app-verificar-transferencia',
  templateUrl: './verificar-transferencia.component.html',
  styleUrls: ['./verificar-transferencia.component.css']
})
export class VerificarTransferenciaComponent implements OnInit {
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
  correo_electronico: string | undefined;
  numero_telefono: string | undefined;

  digits: string[] = ['', '', '', '', ''];
  enteredCode: string = '';
  message: string = '';
  attempts: number = 0;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private http: HttpClient, 
    private transferService: TransferService,
    private codigoService: CodigoService,
    private comprobanteService: ComprobanteService,
    private accountService: AccountService,
    private bloqueoService: BloqueoService
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
      console.log('Usuario: ', this.usuario);
      if (this.usuario) {
        this.obtenerInformacionUsuario(this.usuario);
      }

    });
  }

  obtenerInformacionUsuario(usuario: string): void {
    this.accountService.obtenerUsuario(usuario).subscribe(
      data => {
        if (data && data.usuario) {
          this.correo_electronico = data.usuario.correo_electronico;
          this.numero_telefono = data.usuario.numero_telefono;
          console.log('Correo Electrónico: ', this.correo_electronico);
          console.log('Número de Teléfono: ', this.numero_telefono);

          // Guarda datos en el localStorage
          if (this.correo_electronico && this.numero_telefono) {
            localStorage.setItem('email', this.correo_electronico);
            localStorage.setItem('phoneNumber', this.numero_telefono);
          }

        } else {
          console.log('No se encontró la información del usuario.');
        }
      },
      error => {
        console.error('Error al obtener la información del usuario:', error);
      }
    );
  }

  

  /*async onSubmit(): Promise<void> {
    if (this.numeroIdentidad) {
      try {
        const response = await firstValueFrom(this.codigoService.verifySecurityCode(this.enteredCode));
        this.message = response.message;
        if (this.amount && this.saldo && this.amount <= this.saldo) {
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

          // Navega a comprobar-transferencia con los datos actuales
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
        } else {
          alert('El monto de la transferencia no puede ser mayor que el saldo de la cuenta.');
        }
      } catch (error) {
        this.message = 'Error al confirmar la transferencia.';
        console.error('Error al confirmar la transferencia', error);
      }
    } else {
      this.message = 'Número de identidad no definido.';
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    if (!/^\d$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      const prevInput = document.getElementById('digit' + (index)) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    } else if (event.key === 'ArrowRight' && index < this.digits.length - 1) {
      const nextInput = document.getElementById('digit' + (index + 2)) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    } else if (event.key === 'Backspace' && index > 0 && input.value === '') {
      const prevInput = document.getElementById('digit' + (index)) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (/^\d$/.test(input.value)) {
      this.digits[index] = input.value;
      if (index < this.digits.length - 1) {
        const nextInput = document.getElementById('digit' + (index + 2)) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else {
      input.value = '';
    }
  }*/

  async onSubmit(): Promise<void> {
    const code = this.digits.join('');
    this.http.post('https://bancopolitecnico-backend.vercel.app/verify-code', { email: this.correo_electronico, code }).subscribe(
      async (response: any) => {
        console.log('Código verificado:', response);
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

            // Navega a comprobar transferencia con los datos actuales
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
            alert('Error al confirmar la transferencia.');
          }
        } else {
          alert('El monto de la transferencia no puede ser mayor que el saldo de la cuenta.');
        }
      },
      (error) => {
        console.error('Error al verificar el código:', error);
        this.attempts++;
        if (this.attempts >= 3) {
          alert('Código incorrecto. Ha alcanzado el número máximo de intentos.');
          this.bloquearUsuario();
        } else {
          alert('Código incorrecto. Por favor, inténtelo de nuevo.');
        }
      }
    );
  }

  bloquearUsuario(): void {
    if (this.numeroIdentidad) {
      this.bloqueoService.bloquearUsuarioNumeroIdentidad(this.numeroIdentidad).subscribe(
        response => {
          console.log('Usuario bloqueado:', response);
          this.enviarNotificacionBloqueo();
          //this.enviarNotificacionBloqueo();
          alert('Su cuenta ha sido bloqueada debido a múltiples intentos fallidos. Contacte a soporte para más ayuda.');
          this.router.navigate(['/home']); // Redireccionar a la página de inicio
        },
        error => {
          console.error('Error al bloquear el usuario:', error);
        }
      );
    }
  }

  enviarNotificacionBloqueo(): void {
    console.log('Intentando enviar notificación de bloqueo...');
    if (this.correo_electronico && this.numero_telefono) {
      const subject = 'Intento de transferencia';
      const message = 'Hemos detectado un intento de transferencia desde su cuenta. Si usted no realizo esta solicitud, le recomendamos contactar de inmediato a soporte tecnico para asegurar la proteccion de sus fondos.';
      console.log('Datos de notificación:', { email: this.correo_electronico, phoneNumber: this.numero_telefono, subject, message });

      this.http.post('https://bancopolitecnico-backend.vercel.app/send-confirmation', {
        email: this.correo_electronico,
        phoneNumber: this.numero_telefono,
        subject,
        message
      }).subscribe(
        (response: any) => {
          console.log('Notificación de bloqueo enviada:', response);
        },
        (error) => {
          console.error('Error al enviar la notificación de bloqueo:', error);
        }
      );
    } else {
      console.error('No se pudo enviar la notificación de bloqueo. Información de contacto no disponible.');
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    if (!/^\d$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      const prevInput = document.getElementById('digit' + (index)) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    } else if (event.key === 'ArrowRight' && index < this.digits.length - 1) {
      const nextInput = document.getElementById('digit' + (index + 2)) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    } else if (event.key === 'Backspace' && index > 0 && input.value === '') {
      const prevInput = document.getElementById('digit' + (index)) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (/^\d$/.test(input.value)) {
      this.digits[index] = input.value;
      if (index < this.digits.length - 1) {
        const nextInput = document.getElementById('digit' + (index + 2)) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else {
      input.value = '';
    }
  }

  resendCode(): void {
    const email = localStorage.getItem('email');
    const phoneNumber = localStorage.getItem('phoneNumber');

    if (email && phoneNumber) {
      this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber }).subscribe(
        (response: any) => {
          console.log('Código de seguridad reenviado:', response);
          alert('Se ha reenviado el código de verificación.');
        },
        (error) => {
          console.error('Error al reenviar el código de seguridad:', error);
        }
      );
    } else {
      console.error('No se pudo encontrar el email o el número de teléfono para reenviar el código');
    }
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


  goBack(): void {
    this.route.queryParams.subscribe(params => {
      this.router.navigate(['/confirmar-transferencia'], { queryParams: params });
    });
  }

  generateComprobanteNumber(): string {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  }

  generateComprobanteID(): string {
    return 'ID-' + Math.floor(Math.random() * 1000000);
  }
}
