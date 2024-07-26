import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verify-identity',
  templateUrl: './verify-identity.component.html',
  styleUrls: ['./verify-identity.component.css']
})
export class VerifyIdentityComponent implements OnInit {

  digits: string[] = ['', '', '', '', ''];
  cedula: string = '';
  email: string | null = null;
  attempts: number = 0; // Propiedad para contar los intentos fallidos
  phoneNumber: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  /*
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cedula = params['cedula'];
      console.log('Cédula recibida:', this.cedula);
    });
  }
    */

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cedula = params['cedula'];
      this.email = localStorage.getItem('email'); // Recuperar el email del local storage
      //this.email = params['email'];
      this.phoneNumber = params['phoneNumber'];
      console.log('Cédula recibida:', this.cedula);
      console.log('Email recuperado:', this.email);
      console.log('Numero de telefono:', this.phoneNumber);
    });
  }

  /*
  onSubmit(): void {
    // Lógica para manejar la sumisión del formulario
    console.log('Formulario enviado', this.digits.join(''));
    // Redirige al componente Reset pasando la cédula
    this.router.navigate(['/reset'], { queryParams: { cedula: this.cedula } });
  }
  */

  
  //SIN INTENTOS FALLIDOS
  /*
  onSubmit(): void {
    const code = this.digits.join('');
    const email = this.email; // O el campo correcto de email si está disponible
    this.http.post('https://bancopolitecnico-backend.vercel.app/verify-code', { email, code }).subscribe(
      (response: any) => {
        console.log('Código verificado:', response);
        this.router.navigate(['/reset'], { queryParams: { cedula: this.cedula } });
      },
      (error) => {
        console.error('Error al verificar el código:', error);
      }
    );
  }
  */

  //CON INTENTOS FALLIDOS
  onSubmit(): void {
    const code = this.digits.join('');
    const email = this.email; // O el campo correcto de email si está disponible
    this.http.post('https://bancopolitecnico-backend.vercel.app/verify-code', { email, code }).subscribe(
      (response: any) => {
        console.log('Código verificado:', response);
        this.router.navigate(['/reset'], { queryParams: { cedula: this.cedula } });
      },
      (error) => {
        console.error('Error al verificar el código:', error);
        this.attempts++;
        if (this.attempts >= 3) {
          alert('Ha excedido el número de intentos. Intente nuevamente más tarde.');
          this.enviarNotificacionBloqueo();
          //this.enviarNotificacionBloqueo();
          this.router.navigate(['/home']); // Redireccionar a la página de inicio
        } else {
          alert('Código de verificación incorrecto. Intento ' + this.attempts + ' de 3.');
        }
      }
    );
  }

  //SMS Y CORREO
  /*
  enviarNotificacionBloqueo(): void {
    console.log('Intentando enviar notificación de bloqueo...');
    if (this.email && this.phoneNumber) {
      const subject = 'Intento de recuperación de contraseña';
      const message = 'Se ha detectado un intento de recuperación de clave para su cuenta. Si usted no realizo esta solicitud, por favor contacte a soporte tecnico para asegurar la seguridad de su cuenta.';
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
      const subject = 'Intento de recuperación de contraseña';
      const message = 'Se ha detectado un intento de recuperación de clave para su cuenta. Si usted no realizo esta solicitud, por favor contacte a soporte tecnico para asegurar la seguridad de su cuenta.';
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

    /*enviarNotificacionBloqueo(): void {
      console.log('Intentando enviar notificación de bloqueo...');
      
      if (this.email) {
        const subject = 'Intento de recuperación de contraseña';
        const message = 'Se ha detectado un intento de recuperación de clave para su cuenta. Si usted no realizó esta solicitud, por favor contacte a soporte técnico para asegurar la seguridad de su cuenta.';
        console.log('Datos de notificación:', { email: this.email, subject, message });
    
        // Primer envío de la notificación de bloqueo
        this.http.post('https://bancopolitecnico-backend.vercel.app/send-confirmation', {
          email: this.email,
          subject,
          message
        }).subscribe(
          (response: any) => {
            console.log('Primera notificación de bloqueo enviada:', response);
    
            // Reenvío automático de la notificación de bloqueo
            this.http.post('https://bancopolitecnico-backend.vercel.app/send-confirmation', {
              email: this.email,
              subject,
              message
            }).subscribe(
              (secondResponse: any) => {
                console.log('Segunda notificación de bloqueo enviada:', secondResponse);
              },
              (secondError) => {
                console.error('Error al reenviar la notificación de bloqueo:', secondError);
              }
            );
          },
          (error) => {
            console.error('Error al enviar la primera notificación de bloqueo:', error);
          }
        );
      } else {
        console.error('No se pudo enviar la notificación de bloqueo. Información de contacto no disponible.');
      }
    }*/
    
  
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

  goBack(): void {
    console.log('Volviendo atrás');
    this.router.navigate(['/answer-security-questions'], { queryParams: { cedula: this.cedula } });
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
}