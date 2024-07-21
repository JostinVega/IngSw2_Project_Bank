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
import { UpdatePersonalComponent } from 'src/app/update-personal/update-personal.component';
import { VerificarUpdatePersonalComponent } from 'src/app/verificar-update-personal/verificar-update-personal.component';
import { ConfirmarUpdatePersonalComponent } from 'src/app/confirmar-update-personal/confirmar-update-personal.component';
import { UserRecoveryComponent } from 'src/app/user-recovery/user-recovery.component';
import { VerificarUserRecoveryComponent } from 'src/app/verificar-user-recovery/verificar-user-recovery.component';
import { ConfirmarUserRecoveryComponent } from 'src/app/confirmar-user-recovery/confirmar-user-recovery.component';
import { ChangeUsernameRecoveryComponent } from 'src/app/change-username-recovery/change-username-recovery.component';
import { QuestionsSecUserRecoveryComponent } from 'src/app/questions-sec-user-recovery/questions-sec-user-recovery.component';

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
  { path: 'update-personal', component: UpdatePersonalComponent},
  { path: 'verificar-update-personal', component: VerificarUpdatePersonalComponent},
  { path: 'confirmar-update-personal', component: ConfirmarUpdatePersonalComponent},
  { path: 'user-recovery', component: UserRecoveryComponent},
  { path: 'verificar-user-recovery', component: VerificarUserRecoveryComponent},
  { path: 'confirmar-user-recovery', component: ConfirmarUserRecoveryComponent},
  { path: 'change-username-recovery', component: ChangeUsernameRecoveryComponent},
  { path: 'questions-sec-user-recovery', component: QuestionsSecUserRecoveryComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige '/' a '/inicio'
  { path: '**', redirectTo: '/home' } // Maneja rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
