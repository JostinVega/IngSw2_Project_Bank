import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';
import * as bcrypt from 'bcryptjs';
import { HttpClient } from '@angular/common/http';
import { BloqueoService } from '../services/bloqueo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeForm: FormGroup;
  errorMessage: string = '';
  numero_telefono: string = '';
  correo_electronico: string = '';
  intentosFallidos: number = 0;
  attempts: number = 0;

  constructor(
    private fb: FormBuilder, 
    private authService: AutenticacionService, 
    private router: Router, 
    private bloqueoService: BloqueoService,
    private http: HttpClient
  ) {
    this.homeForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  clearErrorMessage(): void {
    this.errorMessage = '';
  }

  //CORREO Y SMS
  /*
  onSubmit(): void {
    if (this.homeForm.valid) {
      this.authService.obtenerCredenciales(this.homeForm.value.usuario).subscribe(
        async (response: any) => {
          if (response && response.contrasena) {
            const passwordMatches = await bcrypt.compare(this.homeForm.value.contrasena, response.contrasena);
            if (passwordMatches) {
              const email = response.correo_electronico;
              const phoneNumber = response.numero_telefono;
              const code = this.generateCode();
              
              this.sendCode(email, phoneNumber, code).subscribe(
                () => {
                  console.log('Código enviado, navegando a verificar-inicio:', this.homeForm.value.usuario);
                  this.router.navigate(['/verificar-inicio'], { queryParams: { usuario: this.homeForm.value.usuario } });
                },
                error => {
                  this.errorMessage = 'Error al enviar el código de seguridad.';
                  console.error('Error al enviar el código de seguridad:', error);
                }
              );
            } else {
              this.errorMessage = '¡Error! Contraseña incorrecta, escríbala nuevamente.';
            }
          } else {
            this.errorMessage = 'Error al obtener las credenciales';
          }
        },
        (error: any) => {
          console.error('Error durante el inicio de sesión:', error);
          this.errorMessage = 'Error del servidor. Por favor, inténtelo de nuevo más tarde.';
        }
      );
    } else {
      if (this.homeForm.get('usuario')?.invalid) {
        this.errorMessage = 'El campo "Usuario" es obligatorio.';
      } else if (this.homeForm.get('contrasena')?.invalid) {
        this.errorMessage = 'El campo "Contraseña" es obligatorio.';
      } else {
        this.errorMessage = 'Por favor, complete todos los campos requeridos.';
      }
    }
  }

  generateCode(): string {
    return Math.floor(10000 + Math.random() * 90000).toString(); // Genera un número de 5 dígitos
  }

  sendCode(email: string, phoneNumber: string, code: string) {
    return this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber, code });
  }

  */


  onSubmit(): void {
    if (this.homeForm.valid) {
      this.authService.obtenerCredenciales(this.homeForm.value.usuario).subscribe(
        async (response: any) => {
          if (response && response.contrasena) {
            const passwordMatches = await bcrypt.compare(this.homeForm.value.contrasena, response.contrasena);
            if (passwordMatches) {
              if (response.estado === 'Activo') {

                const email = response.correo_electronico;
                //const phoneNumber = response.numero_telefono;
                const code = this.generateCode();
                
                //SMS Y CORREO
                //this.sendCode(email, phoneNumber, code).subscribe(
                //SOLO CORREO
                this.sendCode(email, code).subscribe(
                  () => {
                    if (response.administrador) {
                      this.router.navigate(['/verificar-administrador'], { queryParams: { usuario: this.homeForm.value.usuario } });
                    } else {
                      this.router.navigate(['/verificar-inicio'], { queryParams: { usuario: this.homeForm.value.usuario } });
                    }
                    //console.log('Código enviado, navegando a verificar-inicio:', this.homeForm.value.usuario);
                    //this.router.navigate(['/verificar-inicio'], { queryParams: { usuario: this.homeForm.value.usuario } });
                  },
                  error => {
                    this.errorMessage = 'Error al enviar el código de seguridad.';
                    console.error('Error al enviar el código de seguridad:', error);
                  }
                );

                //this.intentosFallidos = 0; // Resetear contador de intentos fallidos
                //console.log('Navigating with usuario:', this.homeForm.value.usuario);
                //this.router.navigate(['/verificar-inicio'], { queryParams: { usuario: this.homeForm.value.usuario } });
              } else {
                this.errorMessage = 'Tu cuenta está bloqueada. Por favor, contacta al soporte técnico.';
              }
            } else {
              this.attempts++;
              if (this.attempts >= 3) {
                this.numero_telefono = response.numero_telefono;
                this.correo_electronico = response.correo_electronico;
                console.log(this.numero_telefono);
                console.log(this.correo_electronico);
                this.bloquearUsuario();
                this.errorMessage = '¡Error! Contraseña incorrecta por tercera vez. Tu cuenta está bloqueada temporalmente.';
                // Aquí puedes agregar lógica adicional para bloquear la cuenta temporalmente
              } else {
                this.errorMessage = '¡Error! Contraseña incorrecta, escríbala nuevamente.';
              }
            }
          } else {
            this.errorMessage = 'Error al obtener las credenciales';
          }
        },
        (error: any) => {
          console.error('Error durante el inicio de sesión:', error);
          this.errorMessage = 'Error del servidor. Por favor, inténtelo de nuevo más tarde.';
        }
      );
    } else {
      if (this.homeForm.get('usuario')?.invalid) {
        this.errorMessage = 'El campo "Usuario" es obligatorio.';
      } else if (this.homeForm.get('contrasena')?.invalid) {
        this.errorMessage = 'El campo "Contraseña" es obligatorio.';
      } else {
        this.errorMessage = 'Por favor, complete todos los campos requeridos.';
      }
    }
  }

    /*onSubmit(): void {
      if (this.homeForm.valid) {
        this.authService.obtenerCredenciales(this.homeForm.value.usuario).subscribe(
          async (response: any) => {
            if (response && response.contrasena) {
              const passwordMatches = await bcrypt.compare(this.homeForm.value.contrasena, response.contrasena);
              if (passwordMatches) {
                if (response.estado === 'Activo') {
                  const email = response.correo_electronico;
                  const code = this.generateCode();
    
                  // Enviar el código de verificación
                  this.sendCode(email, code).subscribe(
                    () => {
                      // Reenviar el código inmediatamente después del primer envío
                      this.sendCode(email, code).subscribe(
                        () => {
                          // Redirigir según el tipo de usuario
                          if (response.administrador) {
                            this.router.navigate(['/verificar-administrador'], { queryParams: { usuario: this.homeForm.value.usuario } });
                          } else {
                            this.router.navigate(['/verificar-inicio'], { queryParams: { usuario: this.homeForm.value.usuario } });
                          }
                        },
                        error => {
                          this.errorMessage = 'Error al reenviar el código de seguridad.';
                          console.error('Error al reenviar el código de seguridad:', error);
                        }
                      );
                    },
                    error => {
                      this.errorMessage = 'Error al enviar el código de seguridad.';
                      console.error('Error al enviar el código de seguridad:', error);
                    }
                  );
                } else {
                  this.errorMessage = 'Tu cuenta está bloqueada. Por favor, contacta al soporte técnico.';
                }
              } else {
                this.attempts++;
                if (this.attempts >= 3) {
                  this.bloquearUsuario();
                  this.errorMessage = '¡Error! Contraseña incorrecta por tercera vez. Tu cuenta está bloqueada temporalmente.';
                } else {
                  this.errorMessage = '¡Error! Contraseña incorrecta, escríbala nuevamente.';
                }
              }
            } else {
              this.errorMessage = 'Error al obtener las credenciales';
            }
          },
          (error: any) => {
            console.error('Error durante el inicio de sesión:', error);
            this.errorMessage = 'Error del servidor. Por favor, inténtelo de nuevo más tarde.';
          }
        );
      } else {
        if (this.homeForm.get('usuario')?.invalid) {
          this.errorMessage = 'El campo "Usuario" es obligatorio.';
        } else if (this.homeForm.get('contrasena')?.invalid) {
          this.errorMessage = 'El campo "Contraseña" es obligatorio.';
        } else {
          this.errorMessage = 'Por favor, complete todos los campos requeridos.';
        }
      }
    }*/
    

  bloquearUsuario(): void {
    const usuario = this.homeForm.value.usuario;
    if (usuario) {
      this.bloqueoService.bloquearUsuario(usuario).subscribe(
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

  /*enviarNotificacionBloqueo(): void {
    
    console.log('Intentando enviar notificación de bloqueo...');
    console.log(this.correo_electronico);
    console.log(this.numero_telefono);
    console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
    if (this.correo_electronico && this.numero_telefono) {
      const subject = 'Cuenta Bloqueada';
      const message = 'Su cuenta ha sido bloqueada debido a multiples intentos fallidos de inicio de sesion. Contacte a soporte para mas ayuda.';
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
  }*/

    enviarNotificacionBloqueo(): void {
      const usuario = this.homeForm.value.usuario;
      
      if (usuario) {
        this.authService.obtenerCredenciales(usuario).subscribe(
          (response: any) => {
            // Asignar los datos obtenidos
            this.correo_electronico = response.correo_electronico;
            this.numero_telefono = response.numero_telefono;
    
            console.log('Intentando enviar notificación de bloqueo...');
            console.log('Correo:', this.correo_electronico);
            console.log('Teléfono:', this.numero_telefono);
    
            if (this.correo_electronico && this.numero_telefono) {
              const subject = 'Cuenta Bloqueada';
              const message = 'Su cuenta ha sido bloqueada debido a múltiples intentos fallidos de inicio de sesión. Contacte a soporte para más ayuda.';
    
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
          },
          (error: any) => {
            console.error('Error al obtener los datos de contacto:', error);
          }
        );
      } else {
        console.error('No se pudo enviar la notificación de bloqueo. El usuario no está definido.');
      }
    }

      /*enviarNotificacionBloqueo(): void {
        const usuario = this.homeForm.value.usuario;
        
        if (usuario) {
          this.authService.obtenerCredenciales(usuario).subscribe(
            (response: any) => {
              // Asignar los datos obtenidos
              this.correo_electronico = response.correo_electronico;
              this.numero_telefono = response.numero_telefono;
      
              console.log('Intentando enviar notificación de bloqueo...');
              console.log('Correo:', this.correo_electronico);
              console.log('Teléfono:', this.numero_telefono);
      
              if (this.correo_electronico && this.numero_telefono) {
                const subject = 'Cuenta Bloqueada';
                const message = 'Su cuenta ha sido bloqueada debido a múltiples intentos fallidos de inicio de sesión. Contacte a soporte para más ayuda.';
      
                // Primer envío de la notificación de bloqueo
                this.http.post('https://bancopolitecnico-backend.vercel.app/send-confirmation', {
                  email: this.correo_electronico,
                  phoneNumber: this.numero_telefono,
                  subject,
                  message
                }).subscribe(
                  (response: any) => {
                    console.log('Primera notificación de bloqueo enviada:', response);
      
                    // Reenvío automático de la notificación de bloqueo
                    this.http.post('https://bancopolitecnico-backend.vercel.app/send-confirmation', {
                      email: this.correo_electronico,
                      phoneNumber: this.numero_telefono,
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
            },
            (error: any) => {
              console.error('Error al obtener los datos de contacto:', error);
            }
          );
        } else {
          console.error('No se pudo enviar la notificación de bloqueo. El usuario no está definido.');
        }
      }*/
      
    

  passToVerify(): void {
    const recaptchaResponse = (document.querySelector('.g-recaptcha-response') as HTMLInputElement).value;
    if (recaptchaResponse) {
      this.http.post('https://www.google.com/recaptcha/api/siteverify', {
        secret: process.env.FRONT_SECRET, // Reemplaza YOUR_SECRET_KEY con tu clave secreta
        response: recaptchaResponse
      }).subscribe((recaptchaResult: any) => {
        if (recaptchaResult.success) {
          this.router.navigate(['/inicio'], { queryParams: { usuario: this.homeForm.value.usuario } });
        } else {
          this.errorMessage = 'Por favor, complete el reCAPTCHA.';
        }
      });
    } else {
      this.errorMessage = 'Por favor, complete el reCAPTCHA.';
    }
  }

  generateCode(): string {
    return Math.floor(10000 + Math.random() * 90000).toString(); // Genera un número de 5 dígitos
  }

  //CORREO Y SMS
  /*
  sendCode(email: string, phoneNumber:string, code: string) {
    return this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber, code });
  }
  */

  //SOLO CORREO
  
  sendCode(email: string, code: string) {
    return this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, code });
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
