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
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { SalonComponent } from './salon/salon.component';
import { AdminComponent } from './admin/admin.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { ProductoComponent } from './producto/producto.component';

// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
// import { MatGridListModule } from '@angular/material/grid-list';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DetallesusuarioComponent } from './detallesusuario/detallesusuario.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cot', component: CotizacionComponent },
  { path: 'res', component: ReservaComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'salon', component: SalonComponent },
  { path: 'emp', component: EmpleadoComponent },
  { path: 'menu', component: HeaderComponent },
  { path: 'editarusu', component: DetallesusuarioComponent },
  { path: 'prod', component: ProductoComponent }

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
    SalonComponent,
    AdminComponent,
    EmpleadoComponent,
    ProductoComponent,
    DetallesusuarioComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    // MatProgressBarModule,
    // MatButtonModule,
    // MatCardModule,
    // MatIconModule,
    // MatGridListModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
