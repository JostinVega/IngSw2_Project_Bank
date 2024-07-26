import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';
import { BloqueoService } from '../services/bloqueo.service';



@Component({
  selector: 'app-verificar-inicio',
  templateUrl: './verificar-inicio.component.html',
  styleUrls: ['./verificar-inicio.component.css']
})
export class VerificarInicioComponent {

  digits: string[] = ['', '', '', '', ''];
  usuario: string | undefined;
  correo_electronico: string | undefined;
  numero_telefono: string | undefined;
  attempts: number = 0;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private http: HttpClient,
    private bloqueoService: BloqueoService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
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

  /*
  onSubmit(): void {
    // Lógica para manejar la sumisión del formulario
    console.log('Formulario enviado', this.digits.join(''));
    console.log('Navigating with usuario to inicio:', this.usuario);
              this.router.navigate(['/inicio'], { queryParams: { usuario: this.usuario } });
    // Aquí podrías agregar más lógica según lo que necesites al enviar el formulario
  }
  */

  onSubmit(): void {
    const code = this.digits.join('');
    this.http.post('https://bancopolitecnico-backend.vercel.app/verify-code', { email: this.correo_electronico, code }).subscribe(
      (response: any) => {
        console.log('Código verificado:', response);
        this.router.navigate(['/inicio'], { queryParams: { usuario: this.usuario } });
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
    if (this.usuario) {
      this.bloqueoService.bloquearUsuario(this.usuario).subscribe(
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

  //CORREO Y SMS
  /*
  enviarNotificacionBloqueo(): void {
    if (this.correo_electronico && this.numero_telefono) {
      const subject = 'Cuenta Bloqueada';
      const message = 'Su cuenta ha sido bloqueada debido a multiples intentos fallidos de inicio de sesion. Contacte a soporte para mas ayuda.';
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
  */

  //SOLO CORREO

  enviarNotificacionBloqueo(): void {
    console.log('Intentando enviar notificación de bloqueo...');
    const correo_electronico = localStorage.getItem('email');
    const numero_telefono = localStorage.getItem('phoneNumber');

    if (this.correo_electronico) {
      const subject = 'Cuenta Bloqueada';
      const message = 'Su cuenta ha sido bloqueada debido a multiples intentos fallidos de inicio de sesion. Contacte a soporte para mas ayuda.';
      console.log('Datos de notificación:', { email: this.correo_electronico, phoneNumber: this.numero_telefono, subject, message });
      this.http.post('https://bancopolitecnico-backend.vercel.app/send-confirmation', {
        email: this.correo_electronico,
        //phoneNumber: this.numero_telefono,
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

  goBack(): void {
    // Lógica para regresar (volver atrás)
    console.log('Volviendo atrás');
    this.router.navigate(['/home']);
    // Aquí podrías agregar más lógica según lo que necesites para regresar
  }

  resendCode(): void {
    if (this.correo_electronico && this.numero_telefono) {
      this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email: this.correo_electronico, phoneNumber: this.numero_telefono }).subscribe(
        (response: any) => {
          console.log('Código reenviado:', response);
          alert('Código reenviado.');
        },
        (error) => {
          console.error('Error al reenviar el código:', error);
          alert('Error al reenviar el código.');
        }
      );
    } else {
      alert('No se puede reenviar el código. Falta información de contacto.');
    }
  }
}

