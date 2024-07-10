import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SecurityCheckComponent } from './faq/faq.component';

@NgModule({
  declarations: [
    AppComponent,
    SecurityCheckComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule // Importa HttpClientModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
