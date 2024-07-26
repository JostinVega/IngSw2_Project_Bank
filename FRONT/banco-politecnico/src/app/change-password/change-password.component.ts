// change-password.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';
import { PasswordService } from '../services/password.service.service';
import * as bcrypt from 'bcryptjs';
import { environment } from 'src/environments/environment';
import { UsuarioDataChangePasswordService } from '../services/usuario-data-change-password.service';
import { BloqueoService } from '../services/bloqueo.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  numeroIdentidad: string = '';
  usuario: string = '';
  email: string = '';
  phoneNumber: string = '';
  attempts: number = 0; // Contador de intentos fallidos
  newPasswordError: string = '';
  confirmPasswordError: string = '';
  passwordsMatchError: string = '';
  private apiUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private autenticacionService: AutenticacionService,
    private passwordService: PasswordService,
    private http: HttpClient,
    private usuarioDataChangePasswordService: UsuarioDataChangePasswordService,
    private bloqueoService: BloqueoService,
    private accountService: AccountService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.numeroIdentidad = params['numeroIdentidad'];
      this.usuario = params['usuario'];
      console.log('Numero de Identidad recibido:', this.numeroIdentidad);
      console.log('Usuario recibido:', this.usuario);
    });
  }

  validatePassword() {
    if (this.newPassword === this.currentPassword) {
      this.newPasswordError = 'La nueva contraseña no puede ser igual a la contraseña actual.';
    } else if (!this.isPasswordValid(this.newPassword)) {
      this.newPasswordError = 'La contraseña no cumple con los requisitos de seguridad.';
    } else {
      this.newPasswordError = '';
    }
  }

  validatePasswordMatch() {
    if (this.newPassword !== this.confirmPassword) {
      this.confirmPasswordError = 'Las contraseñas no coinciden.';
    } else {
      this.confirmPasswordError = '';
    }
  }

  goBack() {
    this.router.navigate(['/previous-route']);
  }

  /*async changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
      return;
    }

    if (!this.isPasswordValid(this.newPassword)) {
      alert('La contraseña no cumple con los requisitos de seguridad.');
      return;
    }

    try {
      const credenciales = await this.autenticacionService.obtenerCredenciales(this.usuario).toPromise();
      const passwordMatches = await bcrypt.compare(this.currentPassword, credenciales.contrasena);

      if (!passwordMatches) {
        alert('La contraseña actual es incorrecta. Por favor, inténtelo de nuevo.');
        return;
      }

      await this.updatePassword(this.numeroIdentidad, this.newPassword);
      console.log('Password changed successfully.');
      this.router.navigate(['/confirm-change-password']);
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error al cambiar la contraseña. Por favor, inténtelo de nuevo.');
    }
  }*/

  async changePassword() {
    // Verificar si todos los campos están llenos
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      alert('Debe completar todos los campos para continuar.');
      return; // Detener la ejecución si algún campo está vacío
    }
    try {
      const credenciales = await this.autenticacionService.obtenerCredenciales(this.usuario).toPromise();
      console.log(credenciales);
      const passwordMatches = await bcrypt.compare(this.currentPassword, credenciales.contrasena);
      console.log(passwordMatches)
      if (!passwordMatches) {
        this.attempts++;
        alert('La contraseña actual es incorrecta. Por favor, inténtelo de nuevo.');
        if (this.attempts >= 3) {
          this.bloquearUsuario();
        }
        return;
      }

      this.validatePassword();
      this.validatePasswordMatch();

      if (this.newPasswordError || this.confirmPasswordError) {
        return;
      }

      // Envía el código de seguridad después de validar la contraseña
      const email = credenciales.correo_electronico;
      const phoneNumber = credenciales.numero_telefono;

      // Guarda datos en el localStorage
      if (this.email && this.phoneNumber) {
        localStorage.setItem('email', this.email);
        localStorage.setItem('phoneNumber', this.phoneNumber);
      }

      //Almacenar datos del usuario en el servicio Compartido
      this.usuarioDataChangePasswordService.setUsuarioData(credenciales);

      if (!email) {
        throw new Error('Email o número de teléfono no disponibles');
      }

      console.log('Enviando código a:', email, phoneNumber);

      this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber}).subscribe(
        (response: any) => {
          console.log('Código de seguridad enviado:', response);
          this.router.navigate(['/verify-change-password'], { queryParams: { email, phoneNumber, newPassword: this.newPassword, numeroIdentidad: this.numeroIdentidad, usuario: this.usuario } });
        },
        (error) => {
          console.error('Error al enviar el código de seguridad:', error);
          alert('Error al enviar el código de seguridad.');
        }
      );
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error al cambiar la contraseña. Por favor, inténtelo de nuevo.');
    }
  }

    /*async changePassword() {
      // Verificar si todos los campos están llenos
      if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
        alert('Debe completar todos los campos para continuar.');
        return; // Detener la ejecución si algún campo está vacío
      }
      
      try {
        const credenciales = await this.autenticacionService.obtenerCredenciales(this.usuario).toPromise();
        console.log(credenciales);
        const passwordMatches = await bcrypt.compare(this.currentPassword, credenciales.contrasena);
        console.log(passwordMatches)
        
        if (!passwordMatches) {
          this.attempts++;
          alert('La contraseña actual es incorrecta. Por favor, inténtelo de nuevo.');
          if (this.attempts >= 3) {
            this.bloquearUsuario();
          }
          return;
        }
    
        this.validatePassword();
        this.validatePasswordMatch();
    
        if (this.newPasswordError || this.confirmPasswordError) {
          return;
        }
    
        // Envía el código de seguridad después de validar la contraseña
        const email = credenciales.correo_electronico;
        const phoneNumber = credenciales.numero_telefono;
    
        // Guarda datos en el localStorage
        if (this.email && this.phoneNumber) {
          localStorage.setItem('email', this.email);
          localStorage.setItem('phoneNumber', this.phoneNumber);
        }
    
        // Almacenar datos del usuario en el servicio Compartido
        this.usuarioDataChangePasswordService.setUsuarioData(credenciales);
    
        if (!email) {
          throw new Error('Email o número de teléfono no disponibles');
        }
    
        console.log('Enviando código a:', email, phoneNumber);
    
        // Primer envío del código de seguridad
        this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber }).subscribe(
          (response: any) => {
            console.log('Primer código de seguridad enviado:', response);
    
            // Reenvío automático del código de seguridad
            this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber }).subscribe(
              (secondResponse: any) => {
                console.log('Segundo código de seguridad enviado:', secondResponse);
                this.router.navigate(['/verify-change-password'], { queryParams: { email, phoneNumber, newPassword: this.newPassword, numeroIdentidad: this.numeroIdentidad, usuario: this.usuario } });
              },
              (error) => {
                console.error('Error al reenviar el código de seguridad:', error);
                alert('Error al reenviar el código de seguridad.');
              }
            );
          },
          (error) => {
            console.error('Error al enviar el primer código de seguridad:', error);
            alert('Error al enviar el código de seguridad.');
          }
        );
      } catch (error) {
        console.error('Error changing password:', error);
        alert('Error al cambiar la contraseña. Por favor, inténtelo de nuevo.');
      }
    }*/
    

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
  
  enviarNotificacionBloqueo(): void {
    const email = localStorage.getItem('email');
    const phoneNumber = localStorage.getItem('phoneNumber');
    console.log('Intentando enviar notificación de bloqueo...');

    if (email && phoneNumber) {
      const subject = 'Intento de cambio de contraseña';
      const message = 'Hemos detectado un intento de cambio de clave en su cuenta. Si usted no realizo esta solicitud, le recomendamos contactar de inmediato a soporte tecnico para garantizar la seguridad de su cuenta.';
      console.log('Datos de notificación:', { email: email, phoneNumber: phoneNumber, subject, message });

      this.http.post('https://bancopolitecnico-backend.vercel.app/send-confirmation', {
        email: email,
        phoneNumber: phoneNumber,
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
  

  //SOLO CORREO
  /*enviarNotificacionBloqueo(): void {
    const email = localStorage.getItem('email');
    const phoneNumber = localStorage.getItem('phoneNumber');

    console.log('Intentando enviar notificación de bloqueo...');
    if (email) {
      const subject = 'Intento de cambio de contraseña';
      const message = 'Hemos detectado un intento de cambio de clave en su cuenta. Si usted no realizo esta solicitud, le recomendamos contactar de inmediato a soporte tecnico para garantizar la seguridad de su cuenta.';
      console.log('Datos de notificación:', { email: email, subject, message });

      this.http.post('https://bancopolitecnico-backend.vercel.app/send-confirmation', {
        email: email,
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
  }*/

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

  isPasswordValid(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
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
