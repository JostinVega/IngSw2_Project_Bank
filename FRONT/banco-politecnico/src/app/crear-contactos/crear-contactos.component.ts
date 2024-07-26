import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-contactos',
  templateUrl: './crear-contactos.component.html',
  styleUrls: ['./crear-contactos.component.css']
})
export class CrearContactosComponent implements OnInit {
  showModal = false;
  showAgregarContacto = false;
  searchText: string = '';
  contacts: any[] = [];
  filteredContacts: any[] = [];
  selectedContactIndex: number | null = null;
  selectedContact: any = null;
  newContactName: string = '';
  newContactAccount: string = '';
  cuentaNombre: string | undefined;
  numeroCuenta: string | undefined;
  tipoCuenta: string | undefined;
  saldo: number | undefined;
  amount: number | undefined;
  usuario: string | undefined;
  numeroIdentidad: string | undefined;
  nombreUsuario: string = '';
  usuarioValido: boolean = false;
  error: string = '';
  numeroIdentidadCuenta= '';

  constructor(
    private contactService: ContactService, 
    private router: Router, 
    private accountService: AccountService,
    private route: ActivatedRoute,
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

  loadContacts(): void {
    if (this.numeroIdentidad) {
      this.contactService.getContacts(this.numeroIdentidad).subscribe(response => {
        const data = response.contactos;
        if (Array.isArray(data)) {
          this.contacts = data;
          this.processContacts(this.contacts);
          console.log('Contacts loaded:', this.contacts);
        } else {
          console.error('Los datos recibidos no son un array:', data);
        }
      });
    } else {
      console.error('Número de identidad no definido');
    }
  }

  processContacts(contacts: any[]): void {
    contacts.forEach(contact => {
      contact.initials = contact.nombre ? contact.nombre.charAt(0) : '';
      if (!contact.tipoCuenta && contact.numeroCuenta) {
        this.getAccountType(contact.numeroCuenta).then(tipoCuenta => {
          contact.tipoCuenta = tipoCuenta;
        }).catch(error => {
          console.error('Error al obtener el tipo de cuenta para', contact.numeroCuenta, error);
        });
      }
    });
    this.filteredContacts = [...contacts];
    this.sortContacts();
  }

  async getAccountType(accountNumber: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.contactService.checkAccountExists(accountNumber).subscribe(
        data => {
          if (data.exists && data.cuenta && data.cuenta.tipoCuenta) {
            resolve(data.cuenta.tipoCuenta);
          } else {
            resolve('Tipo de cuenta no encontrado');
          }
        },
        error => reject(error)
      );
    });
  }

  filterContacts(): void {
    if (this.searchText) {
      this.filteredContacts = this.contacts.filter(contact => 
        contact.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        contact.numeroCuenta.includes(this.searchText)
      );
    } else {
      this.filteredContacts = [...this.contacts];
    }
    this.processContacts(this.filteredContacts);
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

  selectContact(contact: any): void {
    this.selectedContact = contact;
    this.showAgregarContacto = false; // Ocultar el formulario cuando se selecciona un contacto
    console.log('Selected contact:', contact);
    this.resetForm();
  }

  /*agregarContacto(): void {
    if (this.newContactName && this.newContactAccount) {
      const newContact = {
        numeroIdentidad: this.numeroIdentidad,
        nombre: this.newContactName,
        numeroCuenta: this.newContactAccount,
        tipoCuenta: '',
        isFavorite: false
      };
      this.contactService.addContact(newContact).subscribe(response => {
        console.log('Contacto agregado:', response);
        this.showAgregarContacto = false;
        this.loadContacts();
      }, error => {
        console.error('Error al agregar contacto:', error);
      });
    }
  }*/

  

  /*agregarContacto(): void {
    if (this.newContactAccount) {
      this.contactService.checkContactExistsByAccountNumber(this.newContactAccount).subscribe(
        (response) => {
          if (response.exists) {
            // Si el contacto ya existe, muestra un mensaje de error y no lo agrega
            this.error = `El contacto con la cuenta ${this.newContactAccount} ya está agregado.`;
            this.usuarioValido = false;
          } else {
            // Si el contacto no existe, procede a agregarlo
            if (this.newContactName) {
              const newContact = {
                numeroIdentidad: this.numeroIdentidad,
                nombre: this.newContactName,
                numeroCuenta: this.newContactAccount,
                tipoCuenta: '',
                isFavorite: false
              };
              this.contactService.addContact(newContact).subscribe(
                response => {
                  console.log('Contacto agregado:', response);
                  this.showAgregarContacto = false;
                  this.loadContacts();
                  this.resetForm(); // Restablecer el formulario después de agregar el contacto
                },
                error => {
                  console.error('Error al agregar contacto:', error);
                  this.error = 'Error al agregar el contacto. Por favor, inténtelo de nuevo.';
                }
              );
            }
          }
        },
        error => {
          if (error.status === 404) {
            // Si se recibe un 404, significa que el contacto no existe, así que lo puedes agregar
            if (this.newContactName) {
              const newContact = {
                numeroIdentidad: this.numeroIdentidad,
                nombre: this.newContactName,
                numeroCuenta: this.newContactAccount,
                tipoCuenta: '',
                isFavorite: false
              };
              this.contactService.addContact(newContact).subscribe(
                response => {
                  console.log('Contacto agregado:', response);
                  this.showAgregarContacto = false;
                  this.loadContacts();
                  this.resetForm(); // Restablecer el formulario después de agregar el contacto
                },
                error => {
                  console.error('Error al agregar contacto:', error);
                  this.error = 'Error al agregar el contacto. Por favor, inténtelo de nuevo.';
                }
              );
            }
          } else {
            // Manejo de otros errores
            console.error('Error al verificar si el contacto existe:', error);
            this.error = 'Error al verificar si el contacto ya está en su lista.';
          }
        }
      );
    } else {
      this.error = 'Debe ingresar un número de cuenta válido.';
    }
  }*/

  
  agregarContacto(): void {
    if (this.newContactAccount) {
      // Primero, validar que la cuenta está asociada a una cuenta existente
      this.contactService.checkAccountExists(this.newContactAccount).subscribe(
        (response) => {
          if (response.exists) {
            // Si la cuenta está asociada, proceder a verificar si el contacto ya existe
            this.contactService.checkContactExistsByAccountNumber(this.newContactAccount).subscribe(
              (response) => {
                if (response.exists) {
                  // Si el contacto ya existe, muestra un mensaje de error y no lo agrega
                  this.error = `El contacto con la cuenta ${this.newContactAccount} ya está agregado.`;
                  this.usuarioValido = false;
                } else {
                  // Si el contacto no existe, procede a agregarlo
                  if (this.newContactName) {
                    const newContact = {
                      numeroIdentidad: this.numeroIdentidad,
                      nombre: this.newContactName,
                      numeroCuenta: this.newContactAccount,
                      tipoCuenta: '',
                      isFavorite: false
                    };
                    this.contactService.addContact(newContact).subscribe(
                      response => {
                        console.log('Contacto agregado:', response);
                        this.showAgregarContacto = false;
                        this.loadContacts();
                        this.resetForm(); // Restablecer el formulario después de agregar el contacto
                      },
                      error => {
                        console.error('Error al agregar contacto:', error);
                        this.error = 'Error al agregar el contacto. Por favor, inténtelo de nuevo.';
                      }
                    );
                  }
                }
              },
              error => {
                if (error.status === 404) {
                  // Si se recibe un 404, significa que el contacto no existe, así que lo puedes agregar
                  if (this.newContactName) {
                    const newContact = {
                      numeroIdentidad: this.numeroIdentidad,
                      nombre: this.newContactName,
                      numeroCuenta: this.newContactAccount,
                      tipoCuenta: '',
                      isFavorite: false
                    };
                    this.contactService.addContact(newContact).subscribe(
                      response => {
                        console.log('Contacto agregado:', response);
                        this.showAgregarContacto = false;
                        this.loadContacts();
                        this.resetForm(); // Restablecer el formulario después de agregar el contacto
                      },
                      error => {
                        console.error('Error al agregar contacto:', error);
                        this.error = 'Error al agregar el contacto. Por favor, inténtelo de nuevo.';
                      }
                    );
                  }
                } else {
                  // Manejo de otros errores
                  console.error('Error al verificar si el contacto existe:', error);
                  this.error = 'Error al verificar si el contacto ya está en su lista.';
                }
              }
            );
          } else {
            // Si la cuenta no está asociada, muestra un mensaje de error
            this.error = 'La cuenta proporcionada no está asociada a ninguna cuenta válida.';
            this.usuarioValido = false;
          }
        },
        error => {
          this.error = 'Error al verificar la existencia de la cuenta.';
          this.usuarioValido = false;
        }
      );
    } else {
      this.error = 'Debe ingresar un número de cuenta válido.';
    }
  }
  
  

  toggleAgregarContacto(): void {
    this.showAgregarContacto = !this.showAgregarContacto;
    this.selectedContact = null; // Ocultar el detalle del contacto cuando se muestra el formulario
    this.resetForm();
  }

  resetForm() {
    this.newContactName = '';
    this.newContactAccount = '';
    this.nombreUsuario = '';
    this.usuarioValido = false;
    this.error = '';
  }

  validarCuenta() {
    this.contactService.getIdCuenta(this.newContactAccount).subscribe(
      (data: any) => {
        if (data && data.numeroIdentidad) {
          this.contactService.getNombrexId(data.numeroIdentidad).subscribe(
            (nombreData: any) => {
              if (nombreData && nombreData.nombre_completo) {
                this.nombreUsuario = nombreData.nombre_completo;
                this.newContactName = nombreData.nombre_completo;
                this.usuarioValido = true;
                this.error = '';
              } else {
                this.error = 'No se pudo obtener el nombre del beneficiario';
                this.usuarioValido = false;
              }
            },
            (error ) => {
              this.error = 'Error al obtener el nombre del beneficiario';
              this.usuarioValido = false;
            }
          );
        } else {
          this.error = 'Cuenta no encontrada';
          this.usuarioValido = false;
        }
      },
      (error ) => {
        this.error = 'Error al validar la cuenta';
        this.usuarioValido = false;
      }
    );
  }

  toggleFavorite(contact: any): void {
    const newIsFavorite = !contact.isFavorite;
    this.contactService.updateIsFavoriteByNumeroCuenta(contact.numeroCuenta, newIsFavorite).subscribe(
      response => {
        contact.isFavorite = newIsFavorite;
        this.sortContacts();
      },
      error => {
        console.error('Error al actualizar el estado de favorito:', error);
      }
    );
  }

  deleteContact(contact: any): void {
    this.contactService.deleteContactByNumeroCuenta(contact.numeroCuenta).subscribe(
      response => {
        this.contacts = this.contacts.filter(c => c !== contact);
        this.filterContacts();
      },
      error => {
        console.error('Error al eliminar el contacto:', error);
      }
    );
  }

  searchContacts(): void {
    this.filterContacts();
  }

  highlight(text: string): string {
    if (!this.searchText) return text;
    const regex = new RegExp(`(${this.searchText})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
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
}
