import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsuarioDataService } from '../services/usuario-data.service';


@Component({
  selector: 'app-confirm-reset',
  templateUrl: './confirm-reset.component.html',
  styleUrls: ['./confirm-reset.component.css']
})
export class ConfirmResetComponent implements OnInit{
  private apiUrl = 'https://bancopolitecnico-backend.vercel.app'; // Asegúrate de que esta URL es correcta
  email: string = ''; // Inicializa como vacío
  phoneNumber: string = ''; // Inicializa como vacío

  constructor( private route: ActivatedRoute, private http: HttpClient, private router: Router, private usuarioDataService: UsuarioDataService) {}

  //SMS Y CORREO
  /*
  ngOnInit(): void {
    // Obtener los datos del usuario desde el servicio compartido
    const usuarioData = this.usuarioDataService.getUsuarioData();
    //this.numeroIdentidad = usuarioData.numeroIdentidad;
    this.email = usuarioData.email;
    this.phoneNumber = usuarioData.phoneNumber;

    console.log('Email asignado:', usuarioData.email); // Verificar el email asignado
    console.log('PhoneNumber asignado:', usuarioData.phoneNumber); // Verificar el número de teléfono asignado

    if (this.email && this.phoneNumber) {
      const subject = 'Confirmación de Restablecimiento de Contraseña - Banco Politécnico';
      const message = 'Su clave ha sido restablecida con exito.';
      this.enviarConfirmacion(this.email, this.phoneNumber, subject, message);
    } else {
      console.error('Datos del usuario incompletos');
    }
  }

  enviarConfirmacion(email: string, phoneNumber: string, subject: string, message: string): void {
    const payload = { email, phoneNumber, subject, message };
    console.log('Payload enviado:', payload); // Log para verificar el payload
    
    // Enviar confirmación por correo electrónico y SMS
    this.http.post(`${this.apiUrl}/send-confirmation`, payload).subscribe(
      confirmResponse => {
        console.log('Confirmación enviada:', confirmResponse);
      },
      confirmError => {
        console.error('Error al enviar confirmación:', confirmError);
      }
    );
  }
  */

  //SOLO CORREO

  
  ngOnInit(): void {
    // Obtener los datos del usuario desde el servicio compartido
    const usuarioData = this.usuarioDataService.getUsuarioData();
    //this.numeroIdentidad = usuarioData.numeroIdentidad;
    this.email = usuarioData.email;
    this.phoneNumber = usuarioData.phoneNumber;

    if (this.email) {
      const subject = 'Confirmación de Restablecimiento de Contraseña - Banco Politécnico';
      const message = 'Su contraseña ha sido restablecida con éxito.';
      this.enviarConfirmacion(this.email, subject, message);
      //this.enviarConfirmacion(this.email, subject, message);
    } else {
      console.error('Datos del usuario incompletos');
    }
  }

  /*enviarConfirmacion(email: string, subject: string, message: string): void {
    const payload = { email, subject, message };
    console.log('Payload enviado:', payload); // Log para verificar el payload
    
    // Primer envío de la confirmación por correo electrónico
    this.http.post(`${this.apiUrl}/send-confirmation`, payload).subscribe(
      confirmResponse => {
        console.log('Primera confirmación enviada:', confirmResponse);
  
        // Reenvío automático de la confirmación
        this.http.post(`${this.apiUrl}/send-confirmation`, payload).subscribe(
          secondConfirmResponse => {
            console.log('Segunda confirmación enviada:', secondConfirmResponse);
          },
          secondConfirmError => {
            console.error('Error al reenviar la confirmación:', secondConfirmError);
          }
        );
      },
      confirmError => {
        console.error('Error al enviar la primera confirmación:', confirmError);
      }
    );
  }*/
  

  enviarConfirmacion(email: string, subject: string, message: string): void {
    const payload = { email, subject, message };
    console.log('Payload enviado:', payload); // Log para verificar el payload
    
    // Enviar confirmación por correo electrónico y SMS
    this.http.post(`${this.apiUrl}/send-confirmation`, payload).subscribe(
      confirmResponse => {
        console.log('Confirmación enviada:', confirmResponse);
      },
      confirmError => {
        console.error('Error al enviar confirmación:', confirmError);
      }
    );
  }
  


  goBack() {
    this.router.navigate(['/previous-route']);
  }

  login() {
    this.router.navigate(['/home']);
  }
}