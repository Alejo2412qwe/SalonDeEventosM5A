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
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DetallesusuarioComponent } from './detallesusuario/detallesusuario.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { PerfiluserComponent } from './perfiluser/perfiluser.component';
import { ListausuariosComponent } from './listausuarios/listausuarios.component';
import { ListareservasComponent } from './listareservas/listareservas.component';
import { ListaproductosComponent } from './listaproductos/listaproductos.component';
import { ListasalonesComponent } from './listasalones/listasalones.component';
import { UsuariogestionComponent } from './usuariogestion/usuariogestion.component';
import { GestionproductosComponent } from './gestionproductos/gestionproductos.component';
import { HeaderlogeoComponent } from './headerlogeo/headerlogeo.component';
import { DetallesalonComponent } from './detallesalon/detallesalon.component';
import { GestionsalonesComponent } from './gestionsalones/gestionsalones.component';
import { GestionreservasComponent } from './gestionreservas/gestionreservas.component';
import { GestioncotizacionesComponent } from './gestioncotizaciones/gestioncotizaciones.component';
import { ListacotizacionesComponent } from './listacotizaciones/listacotizaciones.component';

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
  { path: 'editarsalon', component: DetallesalonComponent },
  { path: 'editarusu/:accion/:id', component: DetallesusuarioComponent },
  { path: 'salon/:accion/:id', component: SalonComponent },
  { path: 'prod', component: ProductoComponent },
  { path: 'prod/:accion/:id', component: ProductoComponent },
  { path: 'empresas', component: EmpresaComponent },
  { path: 'perfiluser', component: PerfiluserComponent },
  { path: 'prod', component: ProductoComponent },
  { path: 'listausu', component: ListausuariosComponent },
  { path: 'listares', component: ListareservasComponent },
  { path: 'listaprod', component: ListaproductosComponent },
  { path: 'listasal', component: ListasalonesComponent },
  { path: 'empresas', component: EmpresaComponent },
  { path: 'gestionuser', component: UsuariogestionComponent },
  { path: 'gestionProd', component: GestionproductosComponent },
  { path: 'gestionsalones', component: GestionsalonesComponent },
  { path: 'gestionreservas', component: GestionreservasComponent },
  { path: 'gestioncotizaciones', component: GestioncotizacionesComponent },
  { path: 'listacotizaciones', component: ListacotizacionesComponent}



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
    EmpresaComponent,
    PerfiluserComponent,
    ListausuariosComponent,
    ListareservasComponent,
    ListaproductosComponent,
    ListasalonesComponent,
    UsuariogestionComponent,
    GestionproductosComponent,
    HeaderlogeoComponent,
    DetallesalonComponent,
    GestionsalonesComponent,
    GestionreservasComponent,
    GestioncotizacionesComponent,
    ListacotizacionesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
