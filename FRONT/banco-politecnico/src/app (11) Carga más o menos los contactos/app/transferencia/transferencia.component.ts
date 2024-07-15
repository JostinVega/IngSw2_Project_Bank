/*import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {
  amount: string = '';
  previousValidAmount: string = '';
  selectedAccount: string = '';
  usuario: string | undefined;
  numeroIdentidad: string | undefined;
  userAccounts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
      this.numeroIdentidad = params['numeroIdentidad'];
      if (this.usuario) {
        this.fetchAccounts(this.usuario);
      } else {
        console.error('No usuario passed in queryParams');
      }
    });
  }

  fetchAccounts(usuario: string): void {
    this.accountService.getUserAccounts(usuario).subscribe(
      data => {
        console.log('Cuentas obtenidas:', data);
        this.userAccounts = data.cuentas;
        if (this.userAccounts.length > 0) {
          this.selectedAccount = this.userAccounts[0].numeroCuenta;
        }
      },
      error => {
        console.error('Error fetching accounts:', error);
      }
    );
  }

  onAmountChange(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    const decimalCount = (input.split('.')[1] || '').length;
    const value = parseFloat(input);

    if (/^\d*\.?\d{0,2}$/.test(input) && (value <= 15000 || input === '')) {
      this.amount = input;
    } else {
      if (value > 15000) {
        alert('El valor máximo a transferir es 15000.00');
      }
      (event.target as HTMLInputElement).value = this.amount;
    }
  }

  formatAmount(): void {
    let value = parseFloat(this.amount);
    if (isNaN(value) || value < 1 || value > 15000) {
      if (value > 15000) {
        alert('El valor máximo a transferir es 15000.00');
      }
      this.amount = this.previousValidAmount;
    } else {
      this.amount = value.toFixed(2);
      this.previousValidAmount = this.amount;
    }

    if (this.amount.indexOf('.') !== -1) {
      const parts = this.amount.split('.');
      if (parts[1].length === 1) {
        this.amount = `${parts[0]}.${parts[1]}0`;
      }
    }
  }

  onAccountChange(event: Event): void {
    this.selectedAccount = (event.target as HTMLSelectElement).value;
    console.log('Cuenta seleccionada:', this.selectedAccount);
  }

  goBack(): void {
    console.log('Volver a la página anterior');
  }

  chooseBeneficiary(): void {
    const selectedAccount = this.userAccounts.find(account => account.numeroCuenta === this.selectedAccount);
    if (selectedAccount) {
      this.router.navigate(['/beneficiario'], {
        queryParams: {
          cuentaNombre: selectedAccount.cuentaNombre,
          numeroCuenta: selectedAccount.numeroCuenta,
          tipoCuenta: selectedAccount.tipoCuenta,
          saldo: selectedAccount.saldo,
          amount: this.amount,
          usuario: this.usuario,
          numeroIdentidad: this.numeroIdentidad
        }
      });
    }
  }
}*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {
  amount: string = '';
  previousValidAmount: string = '';
  selectedAccount: string = '';
  usuario: string | undefined;
  numeroIdentidad: string | undefined;
  userAccounts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
      this.numeroIdentidad = params['numeroIdentidad'];
      if (this.usuario) {
        this.fetchAccounts(this.usuario);
      } else {
        console.error('No usuario passed in queryParams');
      }
    });
  }

  fetchAccounts(usuario: string): void {
    this.accountService.getUserAccounts(usuario).subscribe(
      data => {
        console.log('Cuentas obtenidas:', data);
        this.userAccounts = data.cuentas;
        if (this.userAccounts.length > 0) {
          this.selectedAccount = this.userAccounts[0].numeroCuenta;
        }
      },
      error => {
        console.error('Error fetching accounts:', error);
      }
    );
  }

  onAmountChange(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    const decimalCount = (input.split('.')[1] || '').length;
    const value = parseFloat(input);

    if (/^\d*\.?\d{0,2}$/.test(input) && (value <= 15000 || input === '')) {
      this.amount = input;
    } else {
      if (value > 15000) {
        alert('El valor máximo a transferir es 15000.00');
      }
      (event.target as HTMLInputElement).value = this.amount;
    }
  }

  formatAmount(): void {
    let value = parseFloat(this.amount);
    if (isNaN(value) || value < 1 || value > 15000) {
      if (value > 15000) {
        alert('El valor máximo a transferir es 15000.00');
      }
      this.amount = this.previousValidAmount;
    } else {
      this.amount = value.toFixed(2);
      this.previousValidAmount = this.amount;
    }

    if (this.amount.indexOf('.') !== -1) {
      const parts = this.amount.split('.');
      if (parts[1].length === 1) {
        this.amount = `${parts[0]}.${parts[1]}0`;
      }
    }
  }

  onAccountChange(event: Event): void {
    this.selectedAccount = (event.target as HTMLSelectElement).value;
    console.log('Cuenta seleccionada:', this.selectedAccount);
  }

  goBack(): void {
    console.log('Volver a la página anterior');
  }

  chooseBeneficiary(): void {
    if (this.selectedAccount && this.amount) {
      this.router.navigate(['/beneficiario'], {
        queryParams: {
          cuentaNombre: this.userAccounts.find(account => account.numeroCuenta === this.selectedAccount)?.cuentaNombre,
          numeroCuenta: this.selectedAccount,
          tipoCuenta: this.userAccounts.find(account => account.numeroCuenta === this.selectedAccount)?.tipoCuenta,
          saldo: this.userAccounts.find(account => account.numeroCuenta === this.selectedAccount)?.saldo,
          amount: this.amount,
          usuario: this.usuario,
          numeroIdentidad: this.userAccounts.find(account => account.numeroCuenta === this.selectedAccount)?.numero_identidad // Pass identity number
        }
      });
    } else {
      alert('Seleccione una cuenta y un monto válido.');
    }
  }
}
