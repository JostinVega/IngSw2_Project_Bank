import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdministradorService } from 'src/app/services/administrador.service';

// Interfaz para representar una cuenta
interface Account {
  numeroCuenta: string;
  usuario: string;
  tipoCuenta: string;
  saldo: number;
  estado: string;
}

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.css']
})
export class ManageAccountsComponent implements OnInit {
  searchQuery: string = ''; // Variable para almacenar el texto de búsqueda
  accounts: Account[] = []; // Lista de cuentas
  filteredAccounts: Account[] = []; // Lista de cuentas filtradas
  sortDirection: 'asc' | 'desc' = 'asc';
  sortColumn: keyof Account = 'numeroCuenta';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private administradorService: AdministradorService
  ) {}

  // Inicializa la lista de cuentas cuando el componente se carga
  ngOnInit() {
    this.obtenerCuentas();
  }

  // Función para obtener las cuentas usando el servicio
  obtenerCuentas() {
    this.administradorService.obtenerTodasLasCuentas().subscribe(
      response => {
        if (response.message === 'Cuentas encontradas') {
          this.accounts = response.cuentas;
          this.filteredAccounts = this.accounts;
        } else {
          console.error('No se encontraron cuentas');
        }
      },
      error => {
        console.error('Error al obtener cuentas', error);
      }
    );
  }

  // Función para eliminar acentos de una cadena de texto
  normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  // Filtra la lista de cuentas según el texto de búsqueda
  onSearch() {
    if (this.searchQuery.trim() === '') {
      this.filteredAccounts = this.accounts;
      return;
    }

    const normalizedQuery = this.normalizeString(this.searchQuery.toLowerCase());
    this.filteredAccounts = this.accounts.filter(account =>
      this.normalizeString(account.numeroCuenta).includes(normalizedQuery) ||
      this.normalizeString(account.usuario.toLowerCase()).includes(normalizedQuery)
    );
  }

  // Refresca la lista de cuentas
  refresh() {
    this.searchQuery = '';
    this.filteredAccounts = this.accounts;
  }

  // Añade una nueva cuenta (por implementar)
  addAccount() {
    // Implementa la funcionalidad para añadir una nueva cuenta
  }

  // Ordena la lista de cuentas por la columna especificada
  sortBy(column: keyof Account) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.filteredAccounts.sort((a, b) => {
      const valueA = this.normalizeString(a[column].toString()).toLowerCase();
      const valueB = this.normalizeString(b[column].toString()).toLowerCase();
      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  // Obtiene el icono de ordenación para la columna especificada
  getSortIcon(column: keyof Account): string {
    if (this.sortColumn === column) {
      return this.sortDirection === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down';
    }
    return 'fa fa-sort';
  }
}
