import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BloqueoService } from '../services/bloqueo.service';
import { environment } from 'src/environments/environment';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-verificar-update-personal',
  templateUrl: './verificar-update-personal.component.html',
  styleUrls: ['./verificar-update-personal.component.css']
})
export class VerificarUpdatePersonalComponent {

  digits: string[] = ['', '', '', '', ''];
  oldEmail: string = '';
  oldPhone: string = '';
  newEmail: string = '';
  newPhone: string = '';
  numeroIdentidad: string = '';
  usuario: string = '';
  attempts: number = 0;
  maxAttempts: number = 3;
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

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.oldEmail = params['oldEmail'];
      this.oldPhone = params['oldPhone'];
      this.newEmail = params['newEmail'];
      this.newPhone = params['newPhone'];
      this.numeroIdentidad = params['numeroIdentidad'];
      this.usuario = params['usuario'];
      console.log('Número de Identidad recibido :', this.numeroIdentidad);
      console.log('Usuario recibido:', this.usuario);
      console.log('Parametros recibidos en VerificarUpdatePersonalComponent:', params); // Log para verificar parámetros
    });
  }

  async onSubmit(): Promise<void> {
    const code = this.digits.join('');
    try {
      const response: any = await this.http.post('https://bancopolitecnico-backend.vercel.app/verify-code', { email: this.oldEmail, code }).toPromise();
      console.log('Código verificado:', response);
      await this.updatePersonalInfo(this.newEmail, this.newPhone, this.numeroIdentidad);
      this.router.navigate(['/confirmar-update-personal'], { 
        queryParams: { 
          oldEmail: this.oldEmail, 
          oldPhone: this.oldPhone, 
          newEmail: this.newEmail, 
          newPhone: this.newPhone, 
          numeroIdentidad: this.numeroIdentidad,
          usuario: this.usuario
        } 
      });
    } catch (error) {
      console.error('Error al verificar el código:', error);
      this.attempts++;
      if (this.attempts >= this.maxAttempts) {
        alert('Código incorrecto. Ha alcanzado el número máximo de intentos.');
        await this.bloquearUsuario();
      } else {
        alert('Código incorrecto. Inténtelo de nuevo.');
      }
    }
  }

  async bloquearUsuario(): Promise<void> {
    if (this.numeroIdentidad) {
      try {
        const response = await this.bloqueoService.bloquearUsuarioNumeroIdentidad(this.numeroIdentidad).toPromise();
        console.log('Usuario bloqueado:', response);
        alert('Su cuenta ha sido bloqueada debido a múltiples intentos fallidos. Contacte a soporte para más ayuda.');
        //await this.enviarNotificacionBloqueo();
        await this.enviarNotificacionBloqueo();
        this.router.navigate(['/home']); // Redireccionar a la página de inicio
      } catch (error) {
        console.error('Error al bloquear el usuario:', error);
      }
    }
  }

  /*async enviarNotificacionBloqueo(): Promise<void> {
    const subject = 'Cuenta Bloqueada';
    const message = 'Su cuenta ha sido bloqueada debido a múltiples intentos fallidos de verificación de código. Por favor, contacte a soporte para más ayuda.';
  
    try {
      // Primer envío de la notificación de bloqueo
      const response = await this.http.post('https://bancopolitecnico-backend.vercel.app/send-confirmation', {
        email: this.oldEmail,
        phoneNumber: this.oldPhone,
        subject: subject,
        message: message
      }).toPromise();
      console.log('Primera notificación de bloqueo enviada:', response);
  
      // Reenvío automático de la notificación de bloqueo
      const secondResponse = await this.http.post('https://bancopolitecnico-backend.vercel.app/send-confirmation', {
        email: this.oldEmail,
        phoneNumber: this.oldPhone,
        subject: subject,
        message: message
      }).toPromise();
      console.log('Segunda notificación de bloqueo enviada:', secondResponse);
  
    } catch (error) {
      console.error('Error al enviar la notificación de bloqueo:', error);
    }
  }*/
  

  async enviarNotificacionBloqueo(): Promise<void> {
    const subject = 'Cuenta Bloqueada';
    const message = 'Su cuenta ha sido bloqueada debido a múltiples intentos fallidos de verificación de código. Por favor, contacte a soporte para más ayuda.';

    try {
      const response = await this.http.post('https://bancopolitecnico-backend.vercel.app/send-confirmation', {
        email: this.oldEmail,
        phoneNumber: this.oldPhone,
        subject: subject,
        message: message
      }).toPromise();
      console.log('Notificación de bloqueo enviada:', response);
    } catch (error) {
      console.error('Error al enviar la notificación de bloqueo:', error);
    }
  }

  async updatePersonalInfo(email: string, phone: string, numeroIdentidad: string): Promise<void> {
    try {
      const response = await this.http.put(`${this.apiUrl}/actualizar-informacion/${numeroIdentidad}`, { correo_electronico: email, numero_telefono: phone }).toPromise();
      console.log('Información personal actualizada correctamente:', response);
    } catch (error) {
      console.error('Error al actualizar la información personal:', error);
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
    this.router.navigate(['/actualizar-informacion'], {
      queryParams: { numeroIdentidad: this.numeroIdentidad}
    });
  }

  async resendCode(): Promise<void> {
    try {
      const response = await this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email: this.oldEmail, phoneNumber: this.oldPhone }).toPromise();
      console.log('Código de seguridad reenviado:', response);
      alert('Código de seguridad reenviado.');
    } catch (error) {
      console.error('Error al reenviar el código de seguridad:', error);
      alert('Error al reenviar el código de seguridad.');
    }
  }
}
