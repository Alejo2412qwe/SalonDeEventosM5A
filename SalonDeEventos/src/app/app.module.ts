import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HeadersComponent } from './headers/headers.component';
import { FooterComponent } from './footer/footer.component';
import { SliderComponent } from './slider/slider.component';
import { ReservaComponent } from './reserva/reserva.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cot', component: CotizacionComponent },
  { path: 'res', component: ReservaComponent },
  { path: 'menu', component: HeaderComponent }

]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HeadersComponent,
    FooterComponent,
    SliderComponent,
    ReservaComponent,
    CotizacionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
