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
import { ConfirmarTransferenciaComponent } from './confirmar-transferencia/confirmar-transferencia.component';
import { ComprobanteTransferenciaComponent } from './comprobante-transferencia/comprobante-transferencia.component';
import { VerificarCrearCuentaComponent } from './verificar-crear-cuenta/verificar-crear-cuenta.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { ConfirmarCuentaComponent } from './confirmar-cuenta/confirmar-cuenta.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AnswerSecurityQuestionsComponent } from './answer-security-questions/answer-security-questions.component';
import { VerifyIdentityComponent } from './verify-identity/verify-identity.component';
import { ResetComponent } from './reset/reset.component';
import { ConfirmResetComponent } from './confirm-reset/confirm-reset.component';
import { VerificarTransferenciaComponent } from './verificar-transferencia/verificar-transferencia.component';
import { ConfirmChangePasswordComponent } from './confirm-change-password/confirm-change-password.component';
import { ActualizarInformacionComponent } from './actualizar-informacion/actualizar-informacion.component';
import { HistorialTransaccionesComponent } from './historial-transacciones/historial-transacciones.component';
import { VerificarInicioComponent } from './verificar-inicio/verificar-inicio.component';
import { VerPerfilComponent } from './ver-perfil/ver-perfil.component';
import { FaqComponent } from './faq/faq.component';
import { ContactarSoporteComponent } from './contactar-soporte/contactar-soporte.component';
import { VerifyChangePasswordComponent } from './verify-change-password/verify-change-password.component';
import { VerificarUpdatePersonalComponent } from './verificar-update-personal/verificar-update-personal.component';
import { ConfirmarUpdatePersonalComponent } from './confirmar-update-personal/confirmar-update-personal.component';
import { ValidacionCedulaComponent } from './validacion-cedula/validacion-cedula.component';
import { ResponderPreguntasSeguridadComponent } from './responder-preguntas-seguridad/responder-preguntas-seguridad.component';
import { VerificarUsuarioComponent } from './verificar-usuario/verificar-usuario.component';
import { RestablecerUsuarioComponent } from './restablecer-usuario/restablecer-usuario.component';
import { ConfirmarReseteoUsernameComponent } from './confirmar-reseteo-username/confirmar-reseteo-username.component';
import { CrearContactosComponent } from './crear-contactos/crear-contactos.component';
import { AdminComponent } from './admin/admin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { DepositComponent } from './deposit/deposit.component';
import { VerificarAdministradorComponent } from './verificar-administrador/verificar-administrador.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { VerPerfilUsuarioComponent } from './ver-perfil-usuario/ver-perfil-usuario.component';
import { RealizarDepositoComponent } from './realizar-deposito/realizar-deposito.component';

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
  { path: 'confirmar-transferencia', component: ConfirmarTransferenciaComponent},
  { path: 'comprobante-transferencia', component: ComprobanteTransferenciaComponent},
  { path: 'verificar-crear-cuenta', component: VerificarCrearCuentaComponent},
  { path: 'crear-cuenta', component: CrearCuentaComponent},
  { path: 'confirmar-cuenta', component: ConfirmarCuentaComponent},
  { path: 'change-password', component: ChangePasswordComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'answer-security-questions', component: AnswerSecurityQuestionsComponent},
  { path: 'verify-identity', component: VerifyIdentityComponent},
  { path: 'reset', component: ResetComponent},
  { path: 'confirm-reset', component: ConfirmResetComponent},
  { path: 'verificar-transferencia', component: VerificarTransferenciaComponent},
  { path: 'confirm-change-password', component: ConfirmChangePasswordComponent},
  { path: 'actualizar-informacion', component: ActualizarInformacionComponent},
  { path: 'historial-transacciones', component: HistorialTransaccionesComponent},
  { path: 'verificar-inicio', component: VerificarInicioComponent},
  { path: 'ver-perfil', component: VerPerfilComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'contactar-soporte', component: ContactarSoporteComponent},
  { path: 'verify-change-password', component: VerifyChangePasswordComponent},
  { path: 'confirmar-update-personal', component: ConfirmarUpdatePersonalComponent},
  { path: 'verificar-update-personal', component: VerificarUpdatePersonalComponent},
  { path: 'validacion-cedula', component: ValidacionCedulaComponent},
  { path: 'responder-preguntas-seguridad', component: ResponderPreguntasSeguridadComponent},
  { path: 'verificar-usuario', component: VerificarUsuarioComponent},
  { path: 'restablecer-usuario', component: RestablecerUsuarioComponent  },
  { path: 'confirmar-reseteo-username', component: ConfirmarReseteoUsernameComponent},
  { path: 'crear-contactos', component: CrearContactosComponent},
  { path: 'administrador', component: AdminComponent},
  { path: 'administrador/users', component: ManageUsersComponent},
  { path: 'administrador/accounts', component: ManageAccountsComponent},
  { path: 'administrador/deposito', component: DepositComponent},
  { path: 'verificar-administrador', component: VerificarAdministradorComponent},
  { path: 'administrador/transferencias', component: TransactionHistoryComponent},
  { path: 'administrador/ver-perfil-usuario', component: VerPerfilUsuarioComponent},
  { path: 'deposito', component: RealizarDepositoComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige '/' a '/inicio'
  { path: '**', redirectTo: '/home' } // Maneja rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
