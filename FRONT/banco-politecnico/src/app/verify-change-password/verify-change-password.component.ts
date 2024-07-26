import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { BloqueoService } from '../services/bloqueo.service';
import { environment } from 'src/environments/environment';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-verify-change-password',
  templateUrl: './verify-change-password.component.html',
  styleUrls: ['./verify-change-password.component.css']
})
export class VerifyChangePasswordComponent {
  digits: string[] = ['', '', '', '', ''];
  email: string = '';
  phoneNumber: string = '';
  newPassword: string = '';
  numeroIdentidad: string = '';
  attempts: number = 0;
  usuario: string='';

  private apiUrl: string;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private http: HttpClient,
    private bloqueoService: BloqueoService,
    private accountService: AccountService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  /*
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.numeroIdentidad = params['numeroIdentidad'];
    });
  }
    */

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.phoneNumber = params['phoneNumber'];
      this.newPassword = params['newPassword'];
      this.numeroIdentidad = params['numeroIdentidad'];
      this.usuario = params['usuario'];
      console.log('Received params in VerifyChangePasswordComponent:', params);
    });
  }

  /*
  onSubmit(): void {
    // Lógica para manejar la sumisión del formulario
    console.log('Formulario enviado', this.digits.join(''));
    // Aquí podrías agregar más lógica según lo que necesites al enviar el formulario
  }
  */

  /*
  onSubmit(): void {
    const code = this.digits.join('');
    this.http.post('https://bancopolitecnico-backend.vercel.app/verify-code', { email: this.email, code }).subscribe(
      (response: any) => {
        console.log('Código verificado:', response);
        this.router.navigate(['/confirm-change-password'], { queryParams: { numeroIdentidad: this.numeroIdentidad } });
      },
      (error) => {
        console.error('Error al verificar el código:', error);
        alert('Código incorrecto. Por favor, inténtelo de nuevo.');
      }
    );
  }
    */

  onSubmit(): void {
    const code = this.digits.join('');
    this.http.post('https://bancopolitecnico-backend.vercel.app/verify-code', { email: this.email, code }).subscribe(
      async (response: any) => {
        console.log('Código verificado:', response);

        // Cambia la contraseña solo si el código es correcto
        await this.updatePassword(this.numeroIdentidad, this.newPassword);
        this.router.navigate(['/confirm-change-password'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.numeroIdentidad } });
      },
      (error) => {
        console.error('Error al verificar el código:', error);
        this.attempts++;
        if (this.attempts >= 3) {
          alert('Código incorrecto. Ha alcanzado el número máximo de intentos.');
          this.bloquearUsuario();
        } else {
          alert('Código incorrecto. Inténtelo de nuevo.');
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

  //SMS Y CORREO
  /*
  enviarNotificacionBloqueo(): void {
    console.log('Intentando enviar notificación de bloqueo...');
    if (this.email && this.phoneNumber) {
      const subject = 'Intento de cambio de contraseña';
      const message = 'Hemos detectado un intento de cambio de clave en su cuenta. Si usted no realizo esta solicitud, le recomendamos contactar de inmediato a soporte tecnico para garantizar la seguridad de su cuenta.';
      console.log('Datos de notificación:', { email: this.email, phoneNumber: this.phoneNumber, subject, message });

      this.http.post('https://bancopolitecnico-backend.vercel.app/send-confirmation', {
        email: this.email,
        phoneNumber: this.phoneNumber,
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
  */

  //SOLO CORREO

  enviarNotificacionBloqueo(): void {
    console.log('Intentando enviar notificación de bloqueo...');
    if (this.email) {
      const subject = 'Intento de cambio de contraseña';
      const message = 'Hemos detectado un intento de cambio de clave en su cuenta. Si usted no realizo esta solicitud, le recomendamos contactar de inmediato a soporte tecnico para garantizar la seguridad de su cuenta.';
      console.log('Datos de notificación:', { email: this.email, subject, message });

      this.http.post('https://bancopolitecnico-backend.vercel.app/send-confirmation', {
        email: this.email,
        //phoneNumber: this.phoneNumber,
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

  async updatePassword(numero_identidad: string, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const response = await this.http.put(`${this.apiUrl}/actualizar-contrasena/${numero_identidad}`, { contrasena: hashedPassword }).toPromise();
      console.log('Response:', response);
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }

    try {
      const response = await this.http.put(`${this.apiUrl}/update-contrasena/${numero_identidad}`, { contrasena: hashedPassword }).toPromise();
      console.log('Response:', response);
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
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
    // Lógica para regresar (volver atrás)
    this.router.navigate(['/change-password'], { queryParams: { numeroIdentidad: this.numeroIdentidad, usuario: this.usuario} });
    // Aquí podrías agregar más lógica según lo que necesites para regresar
  }

  
  resendCode(): void {
    console.log('Reenviando el código de verificación');
    this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email: this.email, phoneNumber: this.phoneNumber }).subscribe(
      (response: any) => {
        console.log('Código reenviado:', response);
        alert('Código reenviado.');
      },
      (error) => {
        console.error('Error al reenviar el código:', error);
        alert('Error al reenviar el código.');
      }
    );
  }


}