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
import { VistasalonesComponent } from './vistasalones/vistasalones.component';
import { VersalonComponent } from './versalon/versalon.component';
import { ConocenosComponent } from './conocenos/conocenos.component';
import { MapComponent } from './salon/map/map.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MisCotizacionesComponent } from './mis-cotizaciones/mis-cotizaciones.component';
import { MisReservasComponent } from './mis-reservas/mis-reservas.component'
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  // { path: '**', redirectTo: '/menu', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'map', component: MapComponent },
  { path: 'cot/:accion/:id', component: CotizacionComponent, canActivate: [AuthGuard] },
  { path: 'res/:accion/:id', component: ReservaComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'salon', component: SalonComponent, canActivate: [AuthGuard] },
  { path: 'emp', component: EmpleadoComponent, canActivate: [AuthGuard] },
  { path: 'menu', component: HeaderComponent },
  { path: 'editarusu', component: DetallesusuarioComponent, canActivate: [AuthGuard] },
  { path: 'editarsalon', component: DetallesalonComponent, canActivate: [AuthGuard] },
  { path: 'editarusu/:accion/:id', component: DetallesusuarioComponent, canActivate: [AuthGuard] },
  { path: 'versal/:accion/:id', component: VersalonComponent },
  { path: 'mires/:id', component: MisReservasComponent, canActivate: [AuthGuard] },
  { path: 'micot/:id', component: MisCotizacionesComponent, canActivate: [AuthGuard] },
  { path: 'salon/:accion/:id', component: SalonComponent },
  { path: 'prod', component: ProductoComponent, canActivate: [AuthGuard] },
  { path: 'prod/:accion/:id', component: ProductoComponent, canActivate: [AuthGuard] },
  { path: 'empresas', component: EmpresaComponent, canActivate: [AuthGuard] },
  { path: 'perfiluser', component: PerfiluserComponent, canActivate: [AuthGuard] },
  { path: 'prod', component: ProductoComponent, canActivate: [AuthGuard] },
  { path: 'listausu', component: ListausuariosComponent, canActivate: [AuthGuard] },
  { path: 'listares', component: ListareservasComponent, canActivate: [AuthGuard] },
  { path: 'listaprod', component: ListaproductosComponent, canActivate: [AuthGuard] },
  { path: 'listasal', component: ListasalonesComponent, canActivate: [AuthGuard] },
  { path: 'empresas', component: EmpresaComponent, canActivate: [AuthGuard] },
  { path: 'gestionuser', component: UsuariogestionComponent, canActivate: [AuthGuard] },
  { path: 'gestionProd', component: GestionproductosComponent, canActivate: [AuthGuard] },
  { path: 'gestionsalones', component: GestionsalonesComponent, canActivate: [AuthGuard] },
  { path: 'gestionreservas', component: GestionreservasComponent, canActivate: [AuthGuard] },
  { path: 'gestioncotizaciones', component: GestioncotizacionesComponent, canActivate: [AuthGuard] },
  { path: 'salones', component: VistasalonesComponent },
  { path: 'listacotizaciones', component: ListacotizacionesComponent, canActivate: [AuthGuard] },
  { path: 'conocenos', component: ConocenosComponent }

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
    VersalonComponent,
    VistasalonesComponent,
    ConocenosComponent,
    MapComponent,
    MisCotizacionesComponent,
    MisReservasComponent

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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
