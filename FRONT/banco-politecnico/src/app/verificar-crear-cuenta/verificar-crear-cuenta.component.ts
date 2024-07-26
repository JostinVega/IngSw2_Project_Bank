import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsuarioDataCrearCuentaService } from '../services/usuario-data-crear-cuenta.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-verificar-crear-cuenta',
  templateUrl: './verificar-crear-cuenta.component.html',
  styleUrls: ['./verificar-crear-cuenta.component.css']
})
export class VerificarCrearCuentaComponent implements OnInit {

  digits: string[] = ['', '', '', '', ''];
  usuario: string | undefined;
  numeroIdentidad: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined; 
  attempts: number = 0;
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private http: HttpClient,
    private usuarioDataCrearCuentaService: UsuarioDataCrearCuentaService,
    private accountService: AccountService
  ) { }

  /*ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
      this.numeroIdentidad = params['numeroIdentidad'];
      console.log('Received params in VerificarCrearCuentaComponent:', params);
    });
  }*/

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.usuario = params['usuario'];
        this.numeroIdentidad = params['numeroIdentidad'];
        this.email = params['email'];
        this.phoneNumber = params['phoneNumber'];

        // Guarda datos en el localStorage
      if (this.email && this.phoneNumber) {
        localStorage.setItem('email', this.email);
        localStorage.setItem('phoneNumber', this.phoneNumber);
      }

        // Almacenar datos del usuario en el servicio compartido
        const usuarioData = {
          correo_electronico: this.email,
          numero_telefono: this.phoneNumber,
        };
        this.usuarioDataCrearCuentaService.setUsuarioData(usuarioData);

        console.log('Received params in VerificarCrearCuentaComponent:', params);
      });
    }

  //SIN INTENTOS FALLIDOS
  /*
  onSubmit(): void {
    const code = this.digits.join('');
    this.http.post('https://bancopolitecnico-backend.vercel.app/verify-code', { email: this.email, code }).subscribe(
      (response: any) => {
        console.log('Código verificado:', response);
        this.router.navigate(['/crear-cuenta'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.numeroIdentidad } });
      },
      (error) => {
        console.error('Error al verificar el código:', error);
        alert('Código incorrecto o expirado. Inténtelo nuevamente.');
      }
    );
  }
  */

  //CON INTENTOS FALLIDOS
  onSubmit(): void {
    const code = this.digits.join('');
    this.http.post('https://bancopolitecnico-backend.vercel.app/verify-code', { email: this.email, code }).subscribe(
      (response: any) => {
        console.log('Código verificado:', response);
        this.router.navigate(['/crear-cuenta'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.numeroIdentidad } });
      },
      (error) => {
        console.error('Error al verificar el código:', error);
        this.attempts++;
        if (this.attempts >= 3) {
          alert('Ha excedido el número de intentos. Intente nuevamente más tarde.');
          this.router.navigate(['/home']); // Redireccionar a la página de inicio
        } else {
          alert('Código incorrecto o expirado. Intento ' + this.attempts + ' de 3.');
        }
      }
    );
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
    console.log('Volviendo atrás');
    window.history.back();
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
}
