/*import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, AfterViewInit {
  currentIndex: number = 0;
  totalCards: number = 0;
  accounts: any[] = []; // Store fetched accounts data
  usuario: string | undefined; // Define the property usuario

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    window.addEventListener('resize', this.updateNavigation.bind(this));
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
      console.log('Received usuario:', this.usuario);
      if (this.usuario) {
        this.fetchAccounts(this.usuario);
      } else {
        console.error('No usuario passed in queryParams');
      }
    });
  }

  ngAfterViewInit(): void {
    this.totalCards = document.querySelectorAll('.account-card').length;
    this.updateNavigation();
  }

  

  fetchAccounts(usuario?: string): void {
    if (usuario) {
      this.accountService.getUserAccounts(usuario).subscribe(
        data => {
          console.log('Cuentas obtenidas:', data);
          this.accounts = data.cuentas;
          this.totalCards = this.accounts.length;
          this.updateNavigation();
        },
        error => {
          console.error('Error fetching accounts:', error);
        }
      );
    } else {
      console.error('No logged-in user');
    }
  }

  updateNavigation(): void {
    const accountCardsWrapper = document.getElementById('accountCardsWrapper');
    const accountNavLeft = document.getElementById('accountNavLeft');
    const accountNavRight = document.getElementById('accountNavRight');

    if (!accountCardsWrapper || !accountNavLeft || !accountNavRight) {
      return;
    }

    const cardWidth = accountCardsWrapper.children[0]?.clientWidth + 20; // Card width + margin

    if (this.totalCards <= 2) {
      this.renderer.setStyle(accountNavLeft, 'display', 'none');
      this.renderer.setStyle(accountNavRight, 'display', 'none');
    } else {
      this.renderer.setStyle(accountNavLeft, 'display', this.currentIndex === 0 ? 'none' : 'flex');
      this.renderer.setStyle(accountNavRight, 'display', this.currentIndex >= this.totalCards - 2 ? 'none' : 'flex');
    }

    const offset = -this.currentIndex * cardWidth;
    this.renderer.setStyle(accountCardsWrapper, 'transform', `translateX(${offset}px)`);
  }

  navLeft(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateNavigation();
    }
  }

  navRight(): void {
    if (this.currentIndex < this.totalCards - 2) {
      this.currentIndex++;
      this.updateNavigation();
    }
  }

  navigateToTransfer(): void {
    if (this.accounts.length === 1) {
      this.router.navigate(['/transfer'], { queryParams: { usuario: this.usuario } });
    } else {
      this.router.navigate(['/transferencia'], { queryParams: { usuario: this.usuario } });
    }
  }

  navigateToNewAccount(): void {
    this.router.navigate(['/verificar-crear-cuenta'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.getNumeroIdentidad() } });
  }

  getNumeroIdentidad(): string | undefined {
    if (this.accounts.length > 0) {
      return this.accounts[0].numero_identidad;
    }
    return undefined;
  }
}*/

// inicio.component.ts
import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, AfterViewInit {
  currentIndex: number = 0;
  totalCards: number = 0;
  accounts: any[] = [];
  usuario: string | undefined;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    window.addEventListener('resize', this.updateNavigation.bind(this));
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
      if (this.usuario) {
        this.fetchAccounts(this.usuario);
      } else {
        console.error('No usuario passed in queryParams');
      }
    });
  }

  ngAfterViewInit(): void {
    this.totalCards = document.querySelectorAll('.account-card').length;
    this.updateNavigation();
  }

  fetchAccounts(usuario?: string): void {
    if (usuario) {
      this.accountService.getUserAccounts(usuario).subscribe(
        data => {
          this.accounts = data.cuentas;
          this.totalCards = this.accounts.length;
          this.updateNavigation();
        },
        error => {
          console.error('Error fetching accounts:', error);
        }
      );
    } else {
      console.error('No logged-in user');
    }
  }

  updateNavigation(): void {
    const accountCardsWrapper = document.getElementById('accountCardsWrapper');
    const accountNavLeft = document.getElementById('accountNavLeft');
    const accountNavRight = document.getElementById('accountNavRight');

    if (!accountCardsWrapper || !accountNavLeft || !accountNavRight) {
      return;
    }

    const cardWidth = accountCardsWrapper.children[0]?.clientWidth + 20;

    if (this.totalCards <= 2) {
      this.renderer.setStyle(accountNavLeft, 'display', 'none');
      this.renderer.setStyle(accountNavRight, 'display', 'none');
    } else {
      this.renderer.setStyle(accountNavLeft, 'display', this.currentIndex === 0 ? 'none' : 'flex');
      this.renderer.setStyle(accountNavRight, 'display', this.currentIndex >= this.totalCards - 2 ? 'none' : 'flex');
    }

    const offset = -this.currentIndex * cardWidth;
    this.renderer.setStyle(accountCardsWrapper, 'transform', `translateX(${offset}px)`);
  }

  navLeft(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateNavigation();
    }
  }

  navRight(): void {
    if (this.currentIndex < this.totalCards - 2) {
      this.currentIndex++;
      this.updateNavigation();
    }
  }

  navigateToTransfer(): void {
    if (this.accounts.length === 1) {
      this.router.navigate(['/transfer'], { queryParams: { usuario: this.usuario } });
    } else {
      this.router.navigate(['/transferencia'], { queryParams: { usuario: this.usuario } });
    }
  }

  navigateToNewAccount(): void {
    this.router.navigate(['/verificar-crear-cuenta'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.getNumeroIdentidad() } });
  }

  getNumeroIdentidad(): string | undefined {
    if (this.accounts.length > 0) {
      return this.accounts[0].numero_identidad;
    }
    return undefined;
  }

  navigateToChangePassword(): void {
    const numeroIdentidad = this.getNumeroIdentidad();
    if (numeroIdentidad) {
      this.router.navigate(['/change-password'], { queryParams: { numeroIdentidad, usuario: this.usuario} });
    } else {
      console.error('Numero de Identidad no disponible');
    }
  }
}
