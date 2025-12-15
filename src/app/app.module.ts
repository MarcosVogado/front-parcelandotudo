import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { WhatsappButtonComponent } from './shared/components/whatsapp-button/whatsapp-button.component';
import { ConsultaBoletoComponent } from './pages/consulta-boleto/consulta-boleto.component';
import { BarcodeFormComponent } from './core/components/barcode-form/barcode-form.component';
import { ConsultaVeicularComponent } from './pages/consulta-veicular/consulta-veicular.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DefaultNavigationComponent } from './pages/default-navigation/default-navigation.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { pt_BR } from 'ng-zorro-antd/i18n';
import { ZorroModule } from './shared/zorro.module';
import { SelectionDebitComponent } from './pages/selection-debit/selection-debit.component';


registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WhatsappButtonComponent,
    ConsultaBoletoComponent,
    BarcodeFormComponent,
    ConsultaVeicularComponent,
    DefaultNavigationComponent,
    SelectionDebitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ZorroModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: NZ_I18N, useValue: pt_BR }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

