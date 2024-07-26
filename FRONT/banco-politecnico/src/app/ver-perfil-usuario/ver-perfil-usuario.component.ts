import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ver-perfil-usuario',
  templateUrl: './ver-perfil-usuario.component.html',
  styleUrls: ['./ver-perfil-usuario.component.css']
})
export class VerPerfilUsuarioComponent implements OnInit {
  user: any;
  accounts: any[] = [];
  usuario: string | null;
  numeroIdentidad: string | null;
  usuarioAdministrador: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private accountService: AccountService, 
    private http: HttpClient) 
    {
      this.usuario = null;
      this.numeroIdentidad = null;
    
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
      this.numeroIdentidad = params['numeroIdentidad'];
      this.usuarioAdministrador = params['usuarioAdministrador'];

      if (this.numeroIdentidad) {
        this.getUserInfo(this.numeroIdentidad);
      }
    });
  }

  getUserInfo(numeroIdentidad: string): void {
    this.accountService.getUserInfoConCuentas(numeroIdentidad).subscribe(
      response => {
        this.user = response.usuario;
        this.accounts = response.usuario.accounts || [];
      },
      error => {
        console.error('Error fetching user info:', error);
      }
    );
  }

  editInfo(field: string): void {
    this.router.navigate(['/actualizar-informacion'], {
      queryParams: { field, usuario: this.usuario, numeroIdentidad: this.numeroIdentidad }
    });
  }

  getNumeroIdentidad(): string | undefined {
    if (this.accounts.length > 0) {
      return this.accounts[0].numeroIdentidad;
    }
    return undefined;
  }

  navigateToInicioAdministrador() {
    this.router.navigate(['/administrador'], { queryParams: { usuarioAdministrador: this.usuarioAdministrador } });
  }

  navigateToAdministarCuentas() {
    this.router.navigate(['/administrador/accounts'], { queryParams: { usuarioAdministrador: this.usuarioAdministrador } });
  }

  navigateToAdministrarUsuarios() {
    this.router.navigate(['/administrador/users'], { queryParams: { usuarioAdministrador: this.usuarioAdministrador } });
  }

  navigateToDepositos() {
    this.router.navigate(['/administrador/deposito'], { queryParams: { usuarioAdministrador: this.usuarioAdministrador } });
  }

  navigateToTranferencias() {
    this.router.navigate(['/administrador/transferencias'], { queryParams: { usuarioAdministrador: this.usuarioAdministrador } });
  }





}
