/*import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactosComponent } from './contactos/contactos.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NosotrosComponent,
    AyudaComponent,
    ContactosComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }*/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactosComponent } from './contactos/contactos.component';
import { HttpClientModule } from '@angular/common/http';
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
import { ConfirmarTransferenciaComponent } from './confirmar-transferencia/confirmar-transferencia.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';
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
import { VerificarCodigoComponent } from './verificar-codigo/verificar-codigo.component';// Importar HttpClientModule
import { CodigoService } from './services/codigo.service';
import { VerificarTransferenciaComponent } from './verificar-transferencia/verificar-transferencia.component';
import { ConfirmChangePasswordComponent } from './confirm-change-password/confirm-change-password.component';
import { ActualizarInformacionComponent } from './actualizar-informacion/actualizar-informacion.component';
import { HistorialTransaccionesComponent } from './historial-transacciones/historial-transacciones.component';
import { VerificarInicioComponent } from './verificar-inicio/verificar-inicio.component';
import { VerPerfilComponent } from './ver-perfil/ver-perfil.component';
import { FaqComponent } from './faq/faq.component';
import { ContactarSoporteComponent } from './contactar-soporte/contactar-soporte.component';
import { VerifyChangePasswordComponent } from './verify-change-password/verify-change-password.component';
import { ConfirmarUpdatePersonalComponent } from './confirmar-update-personal/confirmar-update-personal.component';
import { VerificarUpdatePersonalComponent } from './verificar-update-personal/verificar-update-personal.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NosotrosComponent,
    AyudaComponent,
    ContactosComponent,
    RegistroComponent,
    CrearUsuarioComponent,
    VerificarComponent,
    PreguntasSeguridadComponent,
    TipoCuentaComponent,
    ConfirmarRegistroComponent,
    InicioComponent,
    BeneficiarioComponent,
    AgregarBeneficiarioComponent,
    AgregarComentarioComponent,
    TransferComponent,
    ConfirmarTransferenciaComponent,
    TransferenciaComponent,
    ComprobanteTransferenciaComponent,
    VerificarCrearCuentaComponent,
    CrearCuentaComponent,
    ConfirmarCuentaComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    AnswerSecurityQuestionsComponent,
    VerifyIdentityComponent,
    ResetComponent,
    ConfirmResetComponent,
    VerificarCodigoComponent,
    VerificarTransferenciaComponent,
    ConfirmChangePasswordComponent,
    ActualizarInformacionComponent,
    HistorialTransaccionesComponent,
    VerificarInicioComponent,
    VerPerfilComponent,
    FaqComponent,
    ContactarSoporteComponent,
    VerifyChangePasswordComponent,
    ConfirmarUpdatePersonalComponent,
    VerificarUpdatePersonalComponent,
    ValidacionCedulaComponent,
    ResponderPreguntasSeguridadComponent,
    VerificarUsuarioComponent,
    RestablecerUsuarioComponent,
    ConfirmarReseteoUsernameComponent,
    CrearContactosComponent,
    AdminComponent,
    ManageUsersComponent,
    ManageAccountsComponent,
    DepositComponent,
    VerificarAdministradorComponent,
    TransactionHistoryComponent,
    VerPerfilUsuarioComponent,
    RealizarDepositoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, // Agregar HttpClientModule aquí
  ],
  providers: [CodigoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

