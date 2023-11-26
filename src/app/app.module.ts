import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MagasinComponent } from './pages/magasin/magasin.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConstantComponent } from './constant/constant.component';
import { BillingDetailsComponent } from './pages/billing-details/billing-details.component';
import { ClientModule } from './client/client.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MagasinComponent,
    ContactComponent,
    ConnexionComponent,
    LayoutComponent,
    PageNotFoundComponent,
    ConstantComponent,
    BillingDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
