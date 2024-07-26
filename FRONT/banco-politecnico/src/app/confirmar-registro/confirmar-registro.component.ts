import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../services/informacion-registro.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirmar-registro',
  templateUrl: './confirmar-registro.component.html',
  styleUrls: ['./confirmar-registro.component.css']
})
export class ConfirmarRegistroComponent implements OnInit {
  cuentaNombre: string | undefined;
  cuentaNumero: string | undefined;
  tipoCuenta: string | undefined;
  saldo: string | undefined;

  email: string | undefined;
  phoneNumber: string | undefined;

  private apiUrl = 'https://bancopolitecnico-backend.vercel.app'; // NOTIFICACIONES

  constructor(private registroService: RegistroService,
              private router: Router,
              private http: HttpClient
            ) { }

  /*ngOnInit(): void {
    const registrationData = this.registroService.getAllData();
    console.log('Datos recibidos para registrar:', registrationData); // Log para verificar datos

    this.cuentaNombre = registrationData.step5?.cuentaNombre;
    this.cuentaNumero = registrationData.step5?.numeroCuenta;
    this.tipoCuenta = registrationData.step5?.tipoCuenta;
    this.saldo = registrationData.step5?.saldo;
  }*/

  //SMS Y CORREO
  /*
  ngOnInit(): void {
    const registrationData = this.registroService.getAllData();
    console.log('Datos recibidos para registrar:', registrationData); // Log para verificar datos

    this.cuentaNombre = registrationData.step5?.cuentaNombre;
    this.cuentaNumero = registrationData.step5?.numeroCuenta;
    this.tipoCuenta = registrationData.step5?.tipoCuenta;
  }
  */

  /*
  ngOnInit(): void {
    const registrationData = this.registroService.getAllData();
    console.log('Datos recibidos para registrar:', registrationData); // Log para verificar datos

    this.cuentaNombre = registrationData.step5?.cuentaNombre;
    this.cuentaNumero = registrationData.step5?.numeroCuenta;
    this.tipoCuenta = registrationData.step5?.tipoCuenta;

    // Verifica que los valores existen en registrationData
    console.log('Step1 data:', registrationData.step1); 

    this.email = registrationData.step1?.correo_electronico; // Ajusta según la estructura de registrationData
    this.phoneNumber = registrationData.step1?.numero_telefono; // Ajusta según la estructura de registrationData

    console.log('Email asignado:', this.email); // Verificar el email asignado
    console.log('PhoneNumber asignado:', this.phoneNumber); // Verificar el número de teléfono asignado

    if (this.email && this.phoneNumber) {
      const subject = 'Confirmación de Registro - Banco Politécnico';
      const message = 'Tu registro en Banco Politécnico ha sido exitoso.';
      this.enviarConfirmacion(this.email, this.phoneNumber, subject, message);
    } else {
      console.error('Email o phoneNumber no está definido');
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

  ngOnInit(): void {
    const registrationData = this.registroService.getAllData();
    console.log('Datos recibidos para registrar:', registrationData); // Log para verificar datos

    this.cuentaNombre = registrationData.step5?.cuentaNombre;
    this.cuentaNumero = registrationData.step5?.numeroCuenta;
    this.tipoCuenta = registrationData.step5?.tipoCuenta;
    this.saldo = registrationData.step5?.saldo;

    // Verifica que los valores existen en registrationData
    console.log('Step1 data:', registrationData.step1); 

    this.email = registrationData.step1?.correo_electronico; // Ajusta según la estructura de registrationData
    this.phoneNumber = registrationData.step1?.numero_telefono; // Ajusta según la estructura de registrationData

    console.log('Email asignado:', this.email); // Verificar el email asignado
    console.log('PhoneNumber asignado:', this.phoneNumber); // Verificar el número de teléfono asignado

    if (this.email) {
      const subject = 'Confirmación de Registro - Banco Politécnico';
      const message = 'Tu registro en Banco Politécnico ha sido exitoso.';
      this.enviarConfirmacion(this.email, subject, message);
      this.enviarConfirmacion(this.email, subject, message);
    } else {
      console.error('Email o phoneNumber no está definido');
    }
  }

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

    /*enviarConfirmacion(email: string, subject: string, message: string): void {
      const payload = { email, subject, message };
      console.log('Payload enviado:', payload); // Log para verificar el payload
      
      // Primer envío de la confirmación
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
    

  onSubmit(): void {
    const registrationData = this.registroService.getAllData();
    console.log('Datos a enviar para registrar:', registrationData); // Asegúrate de que 'saldo' está presente
    this.registroService.registrarUsuario(registrationData).subscribe(
      response => {
        console.log('Datos enviados con éxito:', response);
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Error al enviar los datos:', error);
      }
    );
  }
}
