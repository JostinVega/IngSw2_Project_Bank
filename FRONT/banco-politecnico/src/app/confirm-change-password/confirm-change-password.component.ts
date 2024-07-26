import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import { UsuarioDataChangePasswordService } from '../services/usuario-data-change-password.service';
import { AccountService } from '../services/account.service';
@Component({
  selector: 'app-confirm-change-password',
  templateUrl: './confirm-change-password.component.html',
  styleUrls: ['./confirm-change-password.component.css']
})
export class ConfirmChangePasswordComponent implements OnInit{
  private apiUrl = 'https://bancopolitecnico-backend.vercel.app'; // Asegúrate de que esta URL es correcta
  email: string = '';
  phoneNumber: string = '';
  usuario: string = '';
  numeroIdentidad: string = '';

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private usuarioDataChangePasswordService: UsuarioDataChangePasswordService,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  //CORREO Y SMS

  /*
  
  ngOnInit(): void {
    // Obtener los datos del usuario desde el servicio compartido
    const usuarioData = this.usuarioDataChangePasswordService.getUsuarioData();
    this.email = usuarioData.correo_electronico;
    this.phoneNumber = usuarioData.numero_telefono;

    // Enviar confirmación si los datos están completos
    if (this.email && this.phoneNumber) {
      this.enviarConfirmacion(this.email, this.phoneNumber);
    } else {
      console.error('Datos del usuario incompletos');
    }
  }

  enviarConfirmacion(email: string, phoneNumber: string): void {
    const subject = 'Confirmación de Cambio de Contraseña - Banco Politécnico';
    //const message = 'Su contraseña ha sido cambiada con éxito.';
    const message = 'Su clave ha sido cambiada con exito.';
    const payload = { email, phoneNumber, subject, message };
    console.log('Payload enviado:', payload); // Log para verificar el payload
    
    // Aquí debes enviar la confirmación por correo electrónico y SMS
    this.http.post(`${this.apiUrl}/send-confirmation`, payload).subscribe(
    confirmResponse => {
      console.log('Confirmación enviada:', confirmResponse);
    },
    confirmError => {
      console.error('Error al enviar confirmación:', confirmError);
    });
  }
  
*/
  //SOLO CORREO
  
  ngOnInit(): void {
    // Obtener los datos del usuario desde el servicio compartido
    this.route.queryParams.subscribe(params => {
      this.numeroIdentidad = params['numeroIdentidad'];
      this.usuario = params['usuario'];
      console.log('Numero de Identidad recibido:', this.numeroIdentidad);
      console.log('Usuario recibido:', this.usuario);
    });

    const usuarioData = this.usuarioDataChangePasswordService.getUsuarioData();
    this.email = usuarioData.correo_electronico;
    this.phoneNumber = usuarioData.numero_telefono;

    // Enviar confirmación si los datos están completos
    if (this.email) {
      this.enviarConfirmacion(this.email);
      this.enviarConfirmacion(this.email);
    } else {
      console.error('Datos del usuario incompletos');
    }
  }

  enviarConfirmacion(email: string): void {
    const subject = 'Confirmación de Cambio de Contraseña - Banco Politécnico';
    //const message = 'Su contraseña ha sido cambiada con éxito.';
    const message = 'Su clave ha sido cambiada con exito.';
    const payload = { email, subject, message };
    console.log('Payload enviado:', payload); // Log para verificar el payload
    
    // Aquí debes enviar la confirmación por correo electrónico y SMS
    this.http.post(`${this.apiUrl}/send-confirmation`, payload).subscribe(
    confirmResponse => {
      console.log('Confirmación enviada:', confirmResponse);
    },
    confirmError => {
      console.error('Error al enviar confirmación:', confirmError);
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


  goBack() {
    this.router.navigate(['/previous-route']);
  }

  login() {
    this.router.navigate(['/home']);
  }
}