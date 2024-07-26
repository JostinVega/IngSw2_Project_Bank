import { Component, OnInit } from '@angular/core';
import { AdministradorService } from 'src/app/services/administrador.service'; // Ajusta la ruta según sea necesario
import { Router, ActivatedRoute } from '@angular/router';

interface User {
  numeroIdentidad: string;
  usuario: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  searchQuery: string = ''; 
  users: User[] = [];
  filteredUsers: User[] = []; 
  sortDirection: 'asc' | 'desc' = 'asc';
  sortColumn: keyof User = 'numeroIdentidad';
  usuarioAdministrador: string | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private administradorService: AdministradorService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if(params['usuario']){
        this.usuarioAdministrador = params['usuario'];
        console.log(this.usuarioAdministrador);
      } else {
        this.usuarioAdministrador = params['usuarioAdministrador'];
        console.log(this.usuarioAdministrador);
      }
      
    });
    this.administradorService.obtenerTodosLosUsuarios().subscribe(
      data => {
        this.users = data.usuarios; // Asegúrate de que 'data.usuarios' corresponde a la estructura de la respuesta
        this.filteredUsers = this.users;
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
    
  }

  normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  onSearch() {
    if (this.searchQuery.trim() === '') {
      this.filteredUsers = this.users;
      return;
    }

    const normalizedQuery = this.normalizeString(this.searchQuery.toLowerCase());
    this.filteredUsers = this.users.filter(user =>
      this.normalizeString(user.numeroIdentidad).includes(normalizedQuery) ||
      this.normalizeString(user.usuario.toLowerCase()).includes(normalizedQuery)
    );
  }

  refresh() {
    this.searchQuery = '';
    this.filteredUsers = this.users;
  }

  sortBy(column: keyof User) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.filteredUsers.sort((a, b) => {
      const valueA = this.normalizeString(a[column]).toLowerCase();
      const valueB = this.normalizeString(b[column]).toLowerCase();
      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  getSortIcon(column: keyof User): string {
    if (this.sortColumn === column) {
      return this.sortDirection === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down';
    }
    return 'fa fa-sort';
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
