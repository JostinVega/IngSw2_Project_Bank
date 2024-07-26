import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';

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
  nombre_completo: string | undefined;
  showBalance: boolean = false; 

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    window.addEventListener('resize', this.updateNavigation.bind(this));
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
      if (this.usuario) {
        this.fetchAccounts(this.usuario);
        this.fetchNombreCompleto(this.usuario); 
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
          console.log('Datos completos obtenidos:', data); // Añadir log para verificar los datos completos
          this.accounts = data.cuentas;
          console.log('Cuentas obtenidas:', this.accounts); // Añadir log para verificar las cuentas

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

  fetchNombreCompleto(usuario: string): void {
    this.accountService.getNombreCompleto(usuario).subscribe(
      data => {
        this.nombre_completo = data.nombre_completo;
      },
      error => {
        console.error('Error fetching nombre_completo:', error);
      }
    );
  }

  updateNavigation(): void {
    const accountCardsWrapper = document.getElementById('accountCardsWrapper');

    if (!accountCardsWrapper) {
      return;
    }

    /*const cardWidth = accountCardsWrapper.children[0]?.clientWidth;*/

    const cardWidth = accountCardsWrapper.clientWidth; // Cambiado para obtener el ancho del contenedor
    const offset = -this.currentIndex * cardWidth;
    this.renderer.setStyle(accountCardsWrapper, 'transform', `translateX(${offset}px)`);
  }

  prevCard(): void {
    if (this.currentIndex > 0) {
        this.currentIndex--;
        this.updateNavigation();
    }
  }

  nextCard(): void {
      if (this.currentIndex < this.totalCards - 1) {
          this.currentIndex++;
          this.updateNavigation();
      }
  }

  getNumeroIdentidad(): string | undefined {
    if (this.accounts.length > 0) {
      return this.accounts[0].numeroIdentidad;
    }
    return undefined;
  }

  

  toggleBalanceVisibility(): void { // Agrega esta función
    this.showBalance = !this.showBalance;
  }
 
  navigateToTransfer(): void {
    this.router.navigate(['/transferencia'], { queryParams: { usuario: this.usuario } });
  }

  navigateToAddContact(): void{
    const numeroIdentidad = this.getNumeroIdentidad();
    if (numeroIdentidad) {
      this.router.navigate(['/crear-contactos'], { queryParams: { numeroIdentidad, usuario: this.usuario} });
    } else {
      console.error('Numero de Identidad no disponible');
    }
  }


  navigateToNewAccount(): void {
    const numeroIdentidad = this.getNumeroIdentidad();
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
      const numeroIdentidad = this.getNumeroIdentidad();
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
    this.router.navigate(['/ver-perfil'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.getNumeroIdentidad() } });
  }

  navigateToActualizarInformacion(): void {
    const numeroIdentidad = this.getNumeroIdentidad();
    console.log(numeroIdentidad);
    if (numeroIdentidad) {
      this.router.navigate(['/actualizar-informacion'], { queryParams: { numeroIdentidad, usuario: this.usuario} });
    } else {
      console.error('Numero de Identidad no disponible');
    }
  }

  navigateToFAQ(): void {
    this.router.navigate(['/faq'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.getNumeroIdentidad() } });
  }

  navigateToContactarSoporte(): void {
    this.router.navigate(['/contactar-soporte'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.getNumeroIdentidad() } });
  }

  navigateToInicio(): void {
    this.router.navigate(['/inicio'], { queryParams: { usuario: this.usuario, numeroIdentidad: this.getNumeroIdentidad() } });
  }

  navigateToChangePassword(): void {
    const numeroIdentidad = this.getNumeroIdentidad();
    if (numeroIdentidad) {
      this.router.navigate(['/change-password'], { queryParams: { numeroIdentidad, usuario: this.usuario} });
    } else {
      console.error('Numero de Identidad no disponible');
    }
  }

  navigateToHistorialTransacciones(): void {
    const numeroIdentidad = this.getNumeroIdentidad();
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

}