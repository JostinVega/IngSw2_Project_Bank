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
      this.loadContacts();
    });
  }

  loadContacts(): void {
    if (this.numeroIdentidad) {
      this.contactService.getContacts(this.numeroIdentidad).subscribe(response => {
        const data = response.contactos;
        if (Array.isArray(data)) {
          this.contacts = data;
          this.filteredContacts = this.contacts.map((contact: any) => ({
            ...contact,
            initials: contact.nombre ? contact.nombre.charAt(0) : '',  // Asegurarse de que nombre no sea undefined
            tipoCuenta: '' // Inicializamos tipoCuenta
          }));

          // Llamamos a getAccountType para cada contacto
          this.filteredContacts.forEach(contact => {
            if (contact.numeroCuenta) {
              this.getAccountType(contact.numeroCuenta).then(tipo => {
                contact.tipoCuenta = tipo;
              });
            }
          });

          console.log('Contacts loaded:', this.contacts);
        } else {
          console.error('Los datos recibidos no son un array:', data);
        }
      });
    } else {
      console.error('Número de identidad no definido');
    }
  }

  async getAccountType(accountNumber: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.contactService.checkAccountExists(accountNumber).subscribe(
        data => resolve(data.tipoCuenta),
        error => reject(error)
      );
    });
  }

  filterContacts(): void {
    if (this.searchTerm) {
      this.filteredContacts = this.contacts.filter(contact => 
        contact.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contact.numeroCuenta.includes(this.searchTerm)
      );
    } else {
      this.filteredContacts = [...this.contacts];
    }
  }

  selectContact(contact: any): void {
    this.selectedContact = contact;
    console.log('Selected contact:', contact);
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

  navigateToConfirmarTransferencia(): void {
    if (this.selectedContact) {
      this.router.navigate(['/agregar-comentario'], {
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
    }
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

  goToBeneficiario(): void {
    this.router.navigate(['/beneficiario']);
  }
}
