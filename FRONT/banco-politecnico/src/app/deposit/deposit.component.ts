import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdministradorService } from 'src/app/services/administrador.service';

interface User {
  id: string;
  name: string;
}

interface Account {
  id: string;
  userId: string;
  numeroCuenta: string;
  tipoCuenta: string;
  saldo: number;
  estado: string;
  name?: string; // Opcional: agregar un nombre de cuenta si es necesario
}

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  depositData = {
    user: '',
    account: '',
    amount: 0,
    description: ''  // Add this line
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private administradorService: AdministradorService) {}

  selectedUser: string = '';
  usuarioAdministrador: string = '';
  selectedAccount: Account = {
    id: '',
    userId: '',
    numeroCuenta: '',
    tipoCuenta: '',
    saldo: 0,
    estado: ''
  };

  users: User[] = [
    { id: '1', name: 'Juan Pérez' },
    { id: '2', name: 'María López' },
    { id: '3', name: 'Carlos Martínez' },
    { id: '4', name: 'David' }
  ];

  accounts: Account[] = [
    { id: '1', userId: '1', numeroCuenta: '0011223344', tipoCuenta: 'Ahorros', saldo: 1500, estado: 'Activa' },
    { id: '2', userId: '1', numeroCuenta: '9988776655', tipoCuenta: 'Corriente', saldo: 2500, estado: 'Inactiva' },
    { id: '3', userId: '4', numeroCuenta: '0011223312', tipoCuenta: 'Corriente', saldo: 0, estado: 'Activa' },
    { id: '4', userId: '4', numeroCuenta: '0011223311', tipoCuenta: 'Ahorros', saldo: 0, estado: 'Activa' },
    { id: '5', userId: '4', numeroCuenta: '0011223310', tipoCuenta: 'Corriente', saldo: 0, estado: 'Activa' }
  ];

  filteredAccounts: Account[] = [];
  noAccountsMessage: string = '';
  amountErrorMessage: string = '';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.usuarioAdministrador = params['usuarioAdministrador'];
      console.log(this.usuarioAdministrador);
    });
    this.filteredAccounts = this.accounts;
  }

  onUserChange(event: Event) {
    const selectedUserId = (event.target as HTMLSelectElement).value;
    this.filteredAccounts = this.accounts.filter(account => account.userId === selectedUserId);
    this.depositData.account = '';
    this.selectedAccount = {
      id: '',
      userId: '',
      numeroCuenta: '',
      tipoCuenta: '',
      saldo: 0,
      estado: ''
    };
    this.noAccountsMessage = this.filteredAccounts.length === 0 ? 'Este usuario no tiene cuentas asociadas.' : '';
  }

  onAccountChange(event: Event) {
    const selectedAccountId = (event.target as HTMLSelectElement).value;
    this.selectedAccount = this.accounts.find(account => account.id === selectedAccountId) || this.selectedAccount;
  }

  onAmountChange() {
    this.validateAmount();
  }

  validateAmount(): boolean {
    if (this.depositData.amount <= 0) {
      this.amountErrorMessage = 'El monto debe ser un número positivo.';
      return false;
    }
    this.amountErrorMessage = '';
    return true;
  }

  onSubmit() {
    if (this.validateAmount() && this.depositData.account && this.selectedUser) {
      console.log('Depósito realizado:', this.depositData);
      // Aquí puedes añadir la lógica para realizar el depósito
    } else {
      console.error('Formulario no válido');
    }
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
