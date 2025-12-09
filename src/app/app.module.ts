import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { WhatsappButtonComponent } from './shared/components/whatsapp-button/whatsapp-button.component';
import { HomeComponent } from './pages/home/home.component';
import { BarcodeFormComponent } from './core/components/barcode-form/barcode-form.component';
import { ConsultaVeicularComponent } from './pages/consulta-veicular/consulta-veicular.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WhatsappButtonComponent,
    HomeComponent,
    BarcodeFormComponent,
    ConsultaVeicularComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
