import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-comentario',
  templateUrl: './agregar-comentario.component.html',
  styleUrls: ['./agregar-comentario.component.css']
})

export class AgregarComentarioComponent {
  amount: number = 12.00; // Monto de ejemplo
  comment: string = '';
  beneficiary = {
    name: 'Vega Morales Jostin Alexander',
    accountNumber: '2309807866'
  };

  constructor(private router: Router) { }

  continue(): void {
    // Lógica para continuar con la transferencia
    console.log('Comentario agregado');
  }

  goBack(): void {
    // Lógica para regresar a la pantalla anterior
    this.router.navigate(['/']); // Asegúrate de tener configurada la ruta
  }
}
