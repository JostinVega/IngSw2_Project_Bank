import { Component, OnInit } from '@angular/core';
import { AdministradorService } from 'src/app/services/administrador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { query } from '@angular/animations';
import { ContactService } from '../services/contact.service';

interface User {
  numeroIdentidad: string;
  usuario: string;
  correo_electronico: string;
  administrador: boolean;
  estado: string;
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  searchQuery: string = '';
  users: User[] = [];
  filteredUsers: User[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';
  sortColumn: keyof User = 'numeroIdentidad';
  usuarioAdministrador: string = '';
  
  // Agregar propiedad para el usuario en edición y bandera de edición activa
  editingUser: User | null = null;
  isEditing: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private administradorService: AdministradorService,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.usuarioAdministrador = params['usuarioAdministrador'];
      console.log(this.usuarioAdministrador);
    });
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.administradorService.obtenerTodosLosUsuarios().subscribe(
      data => {
        this.users = data.usuarios;
        this.filteredUsers = this.users;
      },
      error => {
        console.error('Error al cargar usuarios:', error);
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
      this.normalizeString(user.usuario.toLowerCase()).includes(normalizedQuery) ||
      this.normalizeString(user.correo_electronico.toLowerCase()).includes(normalizedQuery)
    );
  }

  refresh() {
    this.searchQuery = '';
    this.filteredUsers = this.users;
  }

  addUser() {
    // Implementa la funcionalidad para añadir un nuevo usuario
  }

  sortBy(column: keyof User) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredUsers.sort((a, b) => {
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

  getSortIcon(column: keyof User): string {
    if (this.sortColumn === column) {
      return this.sortDirection === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down';
    }
    return 'fa fa-sort';
  }

  getRolLabel(administrador: boolean): string {
    return administrador ? 'Administrador' : 'Usuario';
  }

  editUser(user: User) {
    // Clonar el usuario para evitar modificar el original hasta que se confirme la edición
    this.editingUser = { 
      numeroIdentidad: user.numeroIdentidad,
      usuario: user.usuario,
      correo_electronico: user.correo_electronico,
      administrador: user.administrador,
      estado: user.estado 
    };
    this.isEditing = true;
  }
  

  /*saveChanges() {
    if (this.editingUser) {
      const { numeroIdentidad, administrador, estado } = this.editingUser;
  
      // Asegúrate de que todos los valores necesarios están presentes
      if (!numeroIdentidad || administrador === undefined || estado === undefined) {
        console.error('Datos incompletos para la actualización del usuario.');
        return;
      }
  
      // Llamar al servicio para actualizar el usuario
      this.administradorService.actualizarAdminYEstado(numeroIdentidad, administrador, estado).subscribe(
        response => {
          console.log('Usuario actualizado:', response);
          
          // Actualizar la lista de usuarios
          const index = this.users.findIndex(user => user.numeroIdentidad === numeroIdentidad);
          if (index !== -1) {
            this.users[index] = { ...this.editingUser } as User; // Asegúrate de que el objeto es del tipo User
            this.filteredUsers = [...this.users]; // Actualizar la lista filtrada
          }
          this.isEditing = false;
          this.editingUser = null;
        },
        error => {
          console.error('Error al actualizar el usuario:', error);
        }
      );
    }
  }*/

    saveChanges() {
      if (this.editingUser) {
        const { numeroIdentidad, administrador, estado } = this.editingUser;
    
        // Asegúrate de que todos los valores necesarios están presentes
        if (!numeroIdentidad || administrador === undefined || estado === undefined) {
          console.error('Datos incompletos para la actualización del usuario.');
          return;
        }
    
        // Llamar al servicio para actualizar el usuario
        this.administradorService.actualizarAdminYEstado(numeroIdentidad, administrador, estado).subscribe(
          response => {
            console.log('Usuario actualizado:', response);
    
            // Actualizar la lista de usuarios
            const index = this.users.findIndex(user => user.numeroIdentidad === numeroIdentidad);
            if (index !== -1) {
              this.users[index] = { ...this.editingUser } as User; // Asegúrate de que el objeto es del tipo User
              this.filteredUsers = [...this.users]; // Actualizar la lista filtrada
            }
            this.isEditing = false;
            this.editingUser = null;
          },
          error => {
            console.error('Error al actualizar el usuario:', error);
          }
        );
      }
    }
    
    navigateToViewUser(user: User): void {
      this.router.navigate(['/administrador/ver-perfil-usuario'], { 
        queryParams: { 
          usuario: user.usuario, 
          numeroIdentidad: user.numeroIdentidad,
          usuarioAdministrador: this.usuarioAdministrador
        } 
      });
    }

  deleteUser(user: User): void {
    if (confirm(`¿Estás seguro de que deseas eliminar al usuario ${user.usuario}? Esta acción no se puede deshacer.`)) {
      this.administradorService.eliminarUsuario(user.numeroIdentidad).subscribe(
        response => {
          console.log('Usuario eliminado:', response);
          // Remover al usuario de la lista
          this.users = this.users.filter(u => u.numeroIdentidad !== user.numeroIdentidad);
          this.filteredUsers = this.filteredUsers.filter(u => u.numeroIdentidad !== user.numeroIdentidad);
        },
        error => {
          console.error('Error al eliminar el usuario:', error);
          alert('Hubo un error al intentar eliminar el usuario.');
        }
      );
    }
  }

  addAccount(user: User): void {
    const numeroCuenta = this.generateUniqueAccountNumber('5');
    const nombreCuenta = `CORRIENTE-${numeroCuenta.slice(-3)}`;
    const tipoCuentaTexto = 'Corriente';
    const saldoInicial = '0'; // Puedes ajustar el saldo inicial según tus necesidades
    //const usuario = 'user';

    const accountData = {
        numeroIdentidad: user.numeroIdentidad,
        //accountType: 'savings',
        numeroCuenta: numeroCuenta,
        cuentaNombre: nombreCuenta,
        tipoCuenta: tipoCuentaTexto,
        saldo: saldoInicial,
        usuario: user.usuario
    };

    const contacto = {
      numeroIdentidad: user.numeroIdentidad,
      nombre: nombreCuenta,
      numeroCuenta: numeroCuenta,
      isFavorite: true
    }

    console.log('Datos de la cuenta a guardar:', accountData);

    this.administradorService.guardarCuenta(accountData).subscribe(
        response => {
            console.log('Cuenta guardada con éxito:', response);
            alert('Cuenta agregada exitosamente.');
        },
        error => {
            console.error('Error al guardar la cuenta:', error);
            alert('Hubo un error al intentar agregar la cuenta.');
        }
    );
    this.contactService.addContact(contacto).subscribe(response => {
      console.log('Cuenta agregada como beneficiario:', response);
      //alert('Cuenta creada exitosamente.');
    }, error => {
      console.error('Error al almacenar el beneficiario:', error);
    });
}



  generateUniqueAccountNumber(startsWith: string): string {
    let newAccountNumber: string;
    do {
      newAccountNumber = startsWith + this.generateRandomNumberString(9);
    } while (!this.isAccountNumberUnique(newAccountNumber));
    return newAccountNumber;
  }

  generateRandomNumberString(length: number): string {
    let result = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  isAccountNumberUnique(accountNumber: string): boolean {
    // Aquí iría la lógica para verificar si el número de cuenta es único en tu sistema
    // Por ahora, asumimos que todos los números generados son únicos
    return true;
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
