import { Component } from '@angular/core';
import { PasswordService } from '../services/password.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificar-codigo',
  templateUrl: './verificar-codigo.component.html',
  styleUrls: ['./verificar-codigo.component.css']
})
export class VerificarCodigoComponent {
  codigo: string = '';
  numero_identidad: string = ''; // Asegúrate de obtener este valor del usuario

  constructor(private passwordService: PasswordService, private router: Router) { }

  verificarCodigo() {
    const enteredCode = this.codigo.split('').join('');
    this.passwordService.verifySecurityCode(this.numero_identidad, enteredCode).subscribe(
      response => {
        if (response.message === 'Código de seguridad verificado correctamente.') {
          this.router.navigate(['/siguiente-pagina']);
        } else {
          response.errorMessage = 'Código inválido. Por favor, inténtelo de nuevo.';
        }
      },
      error => {
        // Manejar errores
        error.errorMessage = 'Ocurrió un error. Por favor, inténtelo de nuevo.';
      }
    );
  }

}
