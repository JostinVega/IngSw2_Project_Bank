import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';

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
  saldoAntesBeneficiario: number | undefined;
  tipoCuentaBeneficiario: string | undefined;

  constructor(
    private contactService: ContactService, 
    private router: Router, 
    private route: ActivatedRoute,
    private accountService: AccountService,
  private http: HttpClient
  ) { }

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

  /*loadContacts(): void {
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
          this.filteredContacts.forEach(async (contact) => {
            if (contact.numeroCuenta) {
              try {
                contact.tipoCuenta = await this.getAccountType(contact.numeroCuenta);
              } catch (error) {
                console.error('Error al obtener el tipo de cuenta para', contact.numeroCuenta, error);
              }
            }
          });
          this.sortContacts();
          console.log('Contacts loaded:', this.contacts);
        } else {
          console.error('Los datos recibidos no son un array:', data);
        }
      });
    } else {
      console.error('Número de identidad no definido');
    }
  }*/

  loadContacts(): void {
    if (this.numeroIdentidad) {
      this.contactService.getContacts(this.numeroIdentidad).subscribe(response => {
        const data = response.contactos;
        if (Array.isArray(data)) {
          this.contacts = data.map((contact: any) => ({
            ...contact,
            initials: contact.nombre ? contact.nombre.charAt(0) : '',  // Asegúrate de que las iniciales se inicialicen
            tipoCuenta: '' // Inicializa tipoCuenta
          }));
  
          // Llama a getAccountType para cada contacto
          this.contacts.forEach(async (contact) => {
            if (contact.numeroCuenta) {
              try {
                contact.tipoCuenta = await this.getAccountType(contact.numeroCuenta);
              } catch (error) {
                console.error('Error al obtener el tipo de cuenta para', contact.numeroCuenta, error);
              }
            }
          });
          this.filteredContacts = [...this.contacts]; // Inicializa filteredContacts
          this.sortContacts();
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
          data => {
            if (data.exists && data.cuenta && data.cuenta.tipoCuenta) {
              resolve(data.cuenta.tipoCuenta);
            } else {
              resolve('Tipo de cuenta no encontrado'); // Manejo de caso donde no se encuentra el tipo de cuenta
            }
          },
          error => reject(error)
        );
      });
    }

  /*filterContacts(): void {
    if (this.searchTerm) {
      this.filteredContacts = this.contacts.filter(contact => 
        contact.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contact.numeroCuenta.includes(this.searchTerm)
      );
    } else {
      this.filteredContacts = [...this.contacts];
    }
    this.sortContacts();
  }*/

  filterContacts(): void {
    if (this.searchTerm) {
      this.filteredContacts = this.contacts.filter(contact => 
        contact.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contact.numeroCuenta.includes(this.searchTerm)
      ).map(contact => ({
        ...contact,
        initials: contact.nombre ? contact.nombre.charAt(0) : contact.initials, // Asegurarse de que las iniciales se preserven
        tipoCuenta: contact.tipoCuenta || '' // Asegurarse de que tipoCuenta se preserve
      }));
    } else {
      this.filteredContacts = this.contacts.map(contact => ({
        ...contact,
        initials: contact.nombre ? contact.nombre.charAt(0) : contact.initials, // Asegurarse de que las iniciales se preserven
        tipoCuenta: contact.tipoCuenta || '' // Asegurarse de que tipoCuenta se preserve
      }));
    }
    this.sortContacts();
  }

  sortContacts(): void {
    this.filteredContacts.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) {
        return -1;
      } else if (!a.isFavorite && b.isFavorite) {
        return 1;
      } else {
        return a.nombre.localeCompare(b.nombre);
      }
    });
  }

  /*selectContact(contact: any): void {
    this.selectedContact = contact;
    console.log('Selected contact:', contact);
  }*/

    /*selectContact(contact: any): void {
      this.selectedContact = contact;
      console.log('Selected contact:', contact);
      this.contactService.checkAccountExists(contact.numeroCuenta).subscribe(
        data => {
          if (data.exists && data.cuenta && data.cuenta.saldo) {
            this.saldoAntesBeneficiario = data.cuenta.saldo;
            console.log('Saldo antes del beneficiario:', this.saldoAntesBeneficiario);
          } else {
            console.error('No se pudo obtener el saldo de la cuenta');
          }
        },
        error => {
          console.error('Error al verificar la cuenta:', error);
        }
      );
    }*/

      selectContact(contact: any): void {
        this.selectedContact = contact;
        console.log('Selected contact:', contact);
        this.contactService.checkAccountExists(contact.numeroCuenta).subscribe(
          data => {
            if (data.exists && data.cuenta) {
              if (data.cuenta.saldo) {
                this.saldoAntesBeneficiario = data.cuenta.saldo;
                console.log('Saldo antes del beneficiario:', this.saldoAntesBeneficiario);
              }
              if (data.cuenta.tipoCuenta) {
                this.tipoCuentaBeneficiario = data.cuenta.tipoCuenta;
                console.log('Tipo de cuenta del beneficiario:', this.tipoCuentaBeneficiario);
              }
            } else {
              console.error('No se pudo obtener la información de la cuenta');
            }
          },
          error => {
            console.error('Error al verificar la cuenta:', error);
          }
        );
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

  /*navigateToConfirmarTransferencia(): void {
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
          contactNumber: this.selectedContact.numeroCuenta,
          saldoAntesBeneficiario: this.saldoAntesBeneficiario,
          tipoCuentaBeneficiario: this.tipoCuentaBeneficiario
        }
      });
    }
  }*/

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
                  contactNumber: this.selectedContact.numeroCuenta,
                  saldoAntesBeneficiario: this.saldoAntesBeneficiario,
                  tipoCuentaBeneficiario: this.tipoCuentaBeneficiario
              }
          });
      } else {
          alert('Debe seleccionar un beneficiario antes de continuar.');
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

  deleteContact(contact: any, index: number): void {
    this.contactService.deleteContactByNumeroCuenta(contact.numeroCuenta).subscribe(
      response => {
        this.contacts.splice(index, 1);
        this.filterContacts();
        this.selectedContactIndex = null;
      },
      error => {
        console.error('Error al eliminar el contacto:', error);
      }
    );
  }

  addFavorite(contact: any): void {
    const newIsFavorite = !contact.isFavorite;
    this.contactService.updateIsFavoriteByNumeroCuenta(contact.numeroCuenta, newIsFavorite).subscribe(
      response => {
        contact.isFavorite = newIsFavorite;
      },
      error => {
        console.error('Error al actualizar el estado de favorito:', error);
      }
    );
  }

  navigateToTransfer(): void {
    this.router.navigate(['/transferencia'], { queryParams: { usuario: this.usuario } });
  }

  navigateToNewAccount(): void {
    const numeroIdentidad = this.numeroIdentidad;
    if (numeroIdentidad) {
      this.accountService.getUserInfo(numeroIdentidad).subscribe(
        userInfo => {
          const email = userInfo.correo_electronico;
          const phoneNumber = userInfo.numero_telefono;
          //if (email && phoneNumber) {
            //this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber }).subscribe(
          if (email && phoneNumber) {
            this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber}).subscribe(
              (response: any) => {
                console.log('Código de seguridad enviado:', response);
                this.router.navigate(['/verificar-crear-cuenta'], { queryParams: { usuario: this.usuario, numeroIdentidad, email, phoneNumber} });
              },
              (error) => {
                console.error('Error al enviar el código de verificación:', error);
              }
            );
          } else {
            console.error('Email o número de teléfono no disponible');
          }
        },
        error => {
          console.error('Error fetching user info:', error);
        }
      );
    } else {
      console.error('Número de Identidad no disponible');
    }
  }

    /*navigateToNewAccount(): void {
      const numeroIdentidad = this.numeroIdentidad;
      if (numeroIdentidad) {
        this.accountService.getUserInfo(numeroIdentidad).subscribe(
          userInfo => {
            const email = userInfo.correo_electronico;
            const phoneNumber = userInfo.numero_telefono;
            if (email && phoneNumber) {
              // Primer envío del código de verificación
              this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber }).subscribe(
                (response: any) => {
                  console.log('Primer código de seguridad enviado:', response);
    
                  // Reenvío automático del código de verificación
                  this.http.post('https://bancopolitecnico-backend.vercel.app/send-code', { email, phoneNumber }).subscribe(
                    (secondResponse: any) => {
                      console.log('Segundo código de seguridad enviado:', secondResponse);
                      this.router.navigate(['/verificar-crear-cuenta'], { queryParams: { usuario: this.usuario, numeroIdentidad, email, phoneNumber } });
                    },
                    (error) => {
                      console.error('Error al reenviar el código de verificación:', error);
                    }
                  );
                },
                (error) => {
                  console.error('Error al enviar el primer código de verificación:', error);
                }
              );
            } else {
              console.error('Email o número de teléfono no disponible');
            }
          },
          error => {
            console.error('Error fetching user info:', error);
          }
        );
      } else {
        console.error('Número de Identidad no disponible');
      }
    }*/
    

  navigateToVerUsuario(): void {
    this.router.navigate(['/ver-perfil'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.numeroIdentidad } });
  }

  navigateToActualizarInformacion(): void {
    const numeroIdentidad = this.numeroIdentidad;
    console.log(numeroIdentidad);
    if (numeroIdentidad) {
      this.router.navigate(['/actualizar-informacion'], { queryParams: { numeroIdentidad, usuario: this.usuario} });
    } else {
      console.error('Numero de Identidad no disponible');
    }
  }

  navigateToFAQ(): void {
    this.router.navigate(['/faq'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.numeroIdentidad } });
  }

  navigateToContactarSoporte(): void {
    this.router.navigate(['/contactar-soporte'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.numeroIdentidad } });
  }

  navigateToInicio(): void {
    this.router.navigate(['/inicio'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.numeroIdentidad } });
  }

  navigateToChangePassword(): void {
    const numeroIdentidad = this.numeroIdentidad;
    if (numeroIdentidad) {
      this.router.navigate(['/change-password'], { queryParams: { numeroIdentidad, usuario: this.usuario} });
    } else {
      console.error('Numero de Identidad no disponible');
    }
  }

  navigateToHistorialTransacciones(): void {
    const numeroIdentidad = this.numeroIdentidad;
    if (this.usuario && numeroIdentidad) {
      console.log('Navegando a historial-transacciones con:', {
        usuario: this.usuario,
        numeroIdentidad: numeroIdentidad
      });
      this.router.navigate(['/historial-transacciones'], {
        queryParams: {
          usuario: this.usuario,
          numeroIdentidad: numeroIdentidad
        }
      });
    } else {
      console.error('Usuario o Numero de Identidad no disponible');
    }
  }

  navigateToAddContact(): void{
    const numeroIdentidad = this.numeroIdentidad;
    if (numeroIdentidad) {
      this.router.navigate(['/crear-contactos'], { queryParams: { numeroIdentidad, usuario: this.usuario} });
    } else {
      console.error('Numero de Identidad no disponible');
    }
  }

  goToBeneficiario(): void {
    this.router.navigate(['/beneficiario']);
  }

  
}
