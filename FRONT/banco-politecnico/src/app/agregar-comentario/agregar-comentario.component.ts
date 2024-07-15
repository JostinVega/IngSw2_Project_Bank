import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-comentario',
  templateUrl: './agregar-comentario.component.html',
  styleUrls: ['./agregar-comentario.component.css']
})
export class AgregarComentarioComponent implements OnInit {
  cuentaNombre: string | undefined;
  numeroCuenta: string | undefined;
  tipoCuenta: string | undefined;
  saldo: number | undefined;
  amount: number | undefined;
  usuario: string | undefined;
  numeroIdentidad: string | undefined;
  contactName: string | undefined;
  contactNumber: string | undefined;
  contactType: string | undefined;
  comment: string = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cuentaNombre = params['cuentaNombre'];
      this.numeroCuenta = params['numeroCuenta'];
      this.tipoCuenta = params['tipoCuenta'];
      this.saldo = params['saldo'];
      this.amount = params['amount'];
      this.usuario = params['usuario'];
      this.numeroIdentidad = params['numeroIdentidad'];
      this.contactName = params['contactName'];
      this.contactNumber = params['contactNumber'];
      this.contactType = params['contactType'];
      console.log('Received params:', params);
    });
  }

  navigateToConfirmarTransferencia(): void {
    this.router.navigate(['/confirmar-transferencia'], {
      queryParams: {
        cuentaNombre: this.cuentaNombre,
        numeroCuenta: this.numeroCuenta,
        tipoCuenta: this.tipoCuenta,
        saldo: this.saldo,
        amount: this.amount,
        usuario: this.usuario,
        numeroIdentidad: this.numeroIdentidad,
        contactName: this.contactName,
        contactNumber: this.contactNumber,
        comment: this.comment
      }
    });
  }

  continue(): void {
    console.log('Comentario:', this.comment);
    // Aquí puedes agregar la lógica para la siguiente acción
  }

  goBack(): void {
    window.history.back();
  }
}
