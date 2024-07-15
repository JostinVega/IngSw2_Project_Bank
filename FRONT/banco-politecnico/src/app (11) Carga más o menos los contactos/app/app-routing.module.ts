import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { ContactosComponent } from './contactos/contactos.component';
import { RegistroComponent } from './registro/registro.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { VerificarComponent } from './verificar/verificar.component';
import { PreguntasSeguridadComponent } from './preguntas-seguridad/preguntas-seguridad.component';
import { TipoCuentaComponent } from './tipo-cuenta/tipo-cuenta.component';
import { ConfirmarRegistroComponent } from './confirmar-registro/confirmar-registro.component';
import { InicioComponent } from './inicio/inicio.component';
import { BeneficiarioComponent } from './beneficiario/beneficiario.component';
import { AgregarBeneficiarioComponent } from './agregar-beneficiario/agregar-beneficiario.component';
import { AgregarComentarioComponent } from './agregar-comentario/agregar-comentario.component';
import { TransferComponent } from './transfer/transfer.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'ayuda', component: AyudaComponent },
  { path: 'contactos', component: ContactosComponent },
  { path: 'registro', component: RegistroComponent},
  { path: 'crear-usuario', component: CrearUsuarioComponent},
  { path: 'verificar', component: VerificarComponent},
  { path: 'preguntas-seguridad', component: PreguntasSeguridadComponent},
  { path: 'tipo-cuenta', component: TipoCuentaComponent},
  { path: 'confirmar-registro', component: ConfirmarRegistroComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'beneficiario', component: BeneficiarioComponent},
  { path: 'agregar-beneficiario', component: AgregarBeneficiarioComponent},
  { path: 'agregar-comentario', component: AgregarComentarioComponent},
  { path: 'transfer', component: TransferComponent},
  { path: 'transferencia', component: TransferenciaComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige '/' a '/inicio'
  { path: '**', redirectTo: '/home' } // Maneja rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
