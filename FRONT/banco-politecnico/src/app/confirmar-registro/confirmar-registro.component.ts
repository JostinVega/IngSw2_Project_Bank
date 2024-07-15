import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../services/informacion-registro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmar-registro',
  templateUrl: './confirmar-registro.component.html',
  styleUrls: ['./confirmar-registro.component.css']
})
export class ConfirmarRegistroComponent implements OnInit {
  cuentaNombre: string | undefined;
  cuentaNumero: string | undefined;
  tipoCuenta: string | undefined;

  constructor(private registroService: RegistroService,
              private router: Router) { }

  ngOnInit(): void {
    const registrationData = this.registroService.getAllData();
    console.log('Datos recibidos para registrar:', registrationData); // Log para verificar datos

    this.cuentaNombre = registrationData.step5?.cuentaNombre;
    this.cuentaNumero = registrationData.step5?.numeroCuenta;
    this.tipoCuenta = registrationData.step5?.tipoCuenta;
  }

  onSubmit(): void {
    const registrationData = this.registroService.getAllData();
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

