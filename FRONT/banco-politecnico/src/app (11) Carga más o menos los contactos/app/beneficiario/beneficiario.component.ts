/*

import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrls: ['./beneficiario.component.css']
})
export class BeneficiarioComponent implements OnInit {
  showModal = false;
  searchTerm: string = '';
  contacts: any[] = [];
  filteredContacts: any[] = [];
  
  selectedContactIndex: number | null = null;
  selectedContact: any = null;
  searchQuery: string = '';

  cuentaNombre: string | undefined;
  numeroCuenta: string | undefined;
  tipoCuenta: string | undefined;
  saldo: number | undefined;
  amount: number | undefined;
  usuario: string | undefined;
  numeroIdentidad: string | undefined;

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cuentaNombre = params['cuentaNombre'];
      this.numeroCuenta = params['numeroCuenta'];
      this.tipoCuenta = params['tipoCuenta'];
      this.saldo = params['saldo'];
      this.amount = params['amount'];
      this.usuario = params['usuario'];
      this.numeroIdentidad = params['numeroIdentidad'];
      console.log('Received params:', params);
      this.loadContacts(this.numeroIdentidad);
    });
  }

  loadContacts(numeroIdentidad: string | undefined): void {
    if (numeroIdentidad) {
      this.contactService.getContacts(numeroIdentidad).subscribe(
        data => {
          this.contacts = data.contactos;
          this.filteredContacts = [...this.contacts];
        },
        error => {
          console.error('Error fetching contacts:', error);
        }
      );
    }
  }

  filterContacts(): void {
    if (!this.searchTerm) {
      this.filteredContacts = [...this.contacts];
    } else {
      this.filteredContacts = this.contacts.filter(contact =>
        contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contact.number.includes(this.searchTerm)
      );
    }
  }

  selectContact(contact: any): void {
    this.selectedContact = contact;
  }

  navigateToConfirmarTransferencia(): void {
    if (this.selectedContact) {
      this.router.navigate(['/confirmar-transferencia'], {
        queryParams: {
          cuentaNombre: this.cuentaNombre,
          numeroCuenta: this.numeroCuenta,
          tipoCuenta: this.tipoCuenta,
          saldo: this.saldo,
          amount: this.amount,
          usuario: this.usuario,
          numeroIdentidad: this.numeroIdentidad,
          contactName: this.selectedContact.name,
          contactNumber: this.selectedContact.number
        }
      });
    } else {
      console.log('Seleccione un contacto antes de continuar.');
    }
  }

  navigateToAgregarBeneficiario(): void {
    this.router.navigate(['/agregar-beneficiario'], {
      queryParams: {
        cuentaNombre: this.cuentaNombre,
        numeroCuenta: this.numeroCuenta,
        tipoCuenta: this.tipoCuenta,
        saldo: this.saldo,
        amount: this.amount,
        usuario: this.usuario,
        numeroIdentidad: this.numeroIdentidad
      }
    });
  }

  goBack(): void {
    window.history.back();
  }

  toggleMenu(index: number, event: Event): void {
    event.stopPropagation();
    if (this.selectedContactIndex === index) {
      this.selectedContactIndex = null;
    } else {
      this.selectedContactIndex = index;
    }
  }

  deleteContact(index: number): void {
    this.contacts.splice(index, 1);
    this.filterContacts();
    this.selectedContactIndex = null;
  }

  addFavorite(contact: any): void {
    contact.isFavorite = !contact.isFavorite;
  }
}*/

import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrls: ['./beneficiario.component.css']
})
export class BeneficiarioComponent implements OnInit {
  showModal = false;
  searchTerm: string = '';
  contacts: any[] = [];
  filteredContacts: any[] = [];
  
  selectedContactIndex: number | null = null;
  selectedContact: any = null;
  searchQuery: string = '';

  cuentaNombre: string | undefined;
  numeroCuenta: string | undefined;
  tipoCuenta: string | undefined;
  saldo: number | undefined;
  amount: number | undefined;
  usuario: string | undefined;
  numeroIdentidad: string | undefined;

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cuentaNombre = params['cuentaNombre'];
      this.numeroCuenta = params['numeroCuenta'];
      this.tipoCuenta = params['tipoCuenta'];
      this.saldo = params['saldo'];
      this.amount = params['amount'];
      this.usuario = params['usuario'];
      this.numeroIdentidad = params['numeroIdentidad'];
      console.log('Received params:', params);
      this.loadContacts(this.numeroIdentidad);
    });
  }

  loadContacts(numeroIdentidad: string | undefined): void {
    if (numeroIdentidad) {
      this.contactService.getContacts(numeroIdentidad).subscribe(
        data => {
          this.contacts = data.contactos.map((contact: any) => {
            return {
              ...contact,
              initials: contact.nombre.charAt(0).toUpperCase(),
            };
          });
          this.filteredContacts = [...this.contacts];
        },
        error => {
          console.error('Error fetching contacts:', error);
        }
      );
    }
  }

  filterContacts(): void {
    if (!this.searchTerm) {
      this.filteredContacts = [...this.contacts];
    } else {
      this.filteredContacts = this.contacts.filter(contact =>
        contact.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contact.numeroCuenta.includes(this.searchTerm)
      );
    }
  }

  selectContact(contact: any): void {
    this.selectedContact = contact;
  }

  navigateToConfirmarTransferencia(): void {
    if (this.selectedContact) {
      this.router.navigate(['/confirmar-transferencia'], {
        queryParams: {
          cuentaNombre: this.cuentaNombre,
          numeroCuenta: this.numeroCuenta,
          tipoCuenta: this.tipoCuenta,
          saldo: this.saldo,
          amount: this.amount,
          usuario: this.usuario,
          numeroIdentidad: this.numeroIdentidad,
          contactName: this.selectedContact.nombre,
          contactNumber: this.selectedContact.numeroCuenta
        }
      });
    } else {
      console.log('Seleccione un contacto antes de continuar.');
    }
  }

  navigateToAgregarBeneficiario(): void {
    this.router.navigate(['/agregar-beneficiario'], {
      queryParams: {
        cuentaNombre: this.cuentaNombre,
        numeroCuenta: this.numeroCuenta,
        tipoCuenta: this.tipoCuenta,
        saldo: this.saldo,
        amount: this.amount,
        usuario: this.usuario,
        numeroIdentidad: this.numeroIdentidad
      }
    });
  }

  goBack(): void {
    window.history.back();
  }

  toggleMenu(index: number, event: Event): void {
    event.stopPropagation();
    if (this.selectedContactIndex === index) {
      this.selectedContactIndex = null;
    } else {
      this.selectedContactIndex = index;
    }
  }

  deleteContact(index: number): void {
    this.contacts.splice(index, 1);
    this.filterContacts();
    this.selectedContactIndex = null;
  }

  addFavorite(contact: any): void {
    contact.isFavorite = !contact.isFavorite;
  }
}

