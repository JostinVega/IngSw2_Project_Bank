import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-actualizar-informacion',
  templateUrl: './actualizar-informacion.component.html',
  styleUrls: ['./actualizar-informacion.component.css']
})
export class ActualizarInformacionComponent {
  email: string = '';
  phone: string = '';
  oldEmail: string = '';
  oldPhone: string = '';
  emailError: string | null = null;
  phoneError: string | null = null;
  numeroIdentidad: string = '';
  usuario: string = '';

  constructor(
    private route: ActivatedRoute,
    private autenticacionService: AutenticacionService,
    private router: Router,
    private http: HttpClient,
    private accountService: AccountService
  ) { }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.numeroIdentidad = params['numeroIdentidad'];
      this.usuario = params['usuario'];
      console.log('Número de Identidad recibido :', this.numeroIdentidad);
      console.log('Usuario recibido:', this.usuario);
      this.getDatos();
    });
  }

  async getDatos() {
    try {
      const credenciales = await this.autenticacionService.obtenerCredenciales(this.usuario).toPromise();
      this.oldEmail = credenciales.correo_electronico;
      this.oldPhone = credenciales.numero_telefono.replace(/^\+593/, '0');
      this.email = this.oldEmail;
      this.phone = this.oldPhone;
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }

  isFormValid(): boolean {
    return this.email.trim() !== '' || this.phone.trim() !== '';
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@(gmail\.com|hotmail\.com|outlook\.com|epn\.edu\.ec)$/;
    return emailPattern.test(email);
  }

  validatePhone(phone: string): boolean {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
  }

  validateNumber(event: KeyboardEvent) {
    const charCode = event.charCode;
    // Verificar si el charCode está fuera del rango de los números (0-9)
    if (charCode < 48 || charCode > 57) {
        event.preventDefault(); // Bloquear la entrada si no es un número
    }
  }

  async onSubmit() {
    this.emailError = null;
    this.phoneError = null;

    if (!this.isFormValid()) {
      alert('Debe proporcionar al menos un campo para actualizar.');
      return;
    }

    if (this.email && !this.validateEmail(this.email)) {
      this.emailError = 'Correo electrónico inválido.';
    }

    if (this.phone && !this.validatePhone(this.phone)) {
      this.phoneError = 'El número de teléfono debe tener 10 dígitos.';
    }

    if (!this.isFormValid()) {
      this.emailError = this.emailError || 'Proporcione al menos un campo para actualizar.';
      this.phoneError = this.phoneError || 'Proporcione al menos un campo para actualizar.';
      return;
    }

    if (this.emailError || this.phoneError) {
      return;
    }

    try {
      const formattedOldPhone = `+593${this.oldPhone.slice(1)}`;
      await this.sendSecurityCode(this.oldEmail, formattedOldPhone);
      this.router.navigate(['/verificar-update-personal'], {
        queryParams: {
          oldEmail: this.oldEmail,
          oldPhone: formattedOldPhone,
          newEmail: this.email,
          newPhone: this.phone,
          numeroIdentidad: this.numeroIdentidad,
          usuario: this.usuario
        }
      });
    } catch (error) {
      console.error('Error al enviar el código de verificación:', error);
      alert('Error al enviar el código de verificación. Por favor, inténtelo de nuevo.');
    }
  }

  async sendSecurityCode(email: string, phoneNumber: string): Promise<void> {
    try {
      const response = await this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber }).toPromise();
      console.log('Código de seguridad enviado:', response);
    } catch (error) {
      console.error('Error al enviar el código de seguridad:', error);
      throw error;
    }
  }

    /*async sendSecurityCode(email: string, phoneNumber: string): Promise<void> {
      try {
        // Primer envío del código de verificación
        const firstResponse = await this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber }).toPromise();
        console.log('Primer código de seguridad enviado:', firstResponse);
    
        // Reenvío automático del código de verificación
        const secondResponse = await this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber }).toPromise();
        console.log('Segundo código de seguridad enviado:', secondResponse);
      } catch (error) {
        console.error('Error al enviar el código de seguridad:', error);
        throw error;
      }
    }*/
    

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
    this.router.navigate(['/previous-route']);
  }
}
