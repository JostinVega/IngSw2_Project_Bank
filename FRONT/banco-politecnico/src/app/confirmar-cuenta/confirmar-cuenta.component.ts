import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroService } from '../services/informacion-registro.service';

@Component({
  selector: 'app-confirmar-cuenta',
  templateUrl: './confirmar-cuenta.component.html',
  styleUrls: ['./confirmar-cuenta.component.css']
})
export class ConfirmarCuentaComponent implements OnInit {
  usuario: string | undefined;
  numeroIdentidad: string | undefined;
  tipoCuenta: string | undefined;
  cuentaNombre: string | undefined;
  cuentaNumero: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private registroService: RegistroService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
      this.numeroIdentidad = params['numeroIdentidad'];
      this.tipoCuenta = params['tipoCuenta'];
      this.cuentaNombre = params['cuentaNombre'];
      this.cuentaNumero = params['cuentaNumero'];
      console.log('Received params in ConfirmarCuentaComponent:', params);

      // Llamar al servicio para almacenar los datos en la base de datos
      const accountData = {
        numeroCuenta: this.cuentaNumero,
        cuentaNombre: this.cuentaNombre,
        tipoCuenta: this.tipoCuenta,
        usuario: this.usuario,
        numeroIdentidad: this.numeroIdentidad,
        saldo: 0 // Asumiendo que el saldo inicial es 0, ajustar según sea necesario
      };

      this.registroService.setCuenta(accountData).subscribe(response => {
        console.log('Datos almacenados en la base de datos:', response);
        alert('Cuenta creada exitosamente.');
      }, error => {
        console.error('Error al almacenar los datos en la base de datos:', error);
      });
    });
  }

  confirmar() {
    // Aquí puedes agregar lógica adicional si es necesario
    this.router.navigate(['/inicio'], );
  }

  goBack(): void {
    // Lógica para regresar a la pantalla anterior
    window.history.back();
  }
}
