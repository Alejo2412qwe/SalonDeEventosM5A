import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../service/reserva.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reserva } from '../modelo/reserva';
import { ImagenService } from '../service/imagen.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { CotizacionService } from '../service/cotizacion.service';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit {

  imageToShow: any;
  reserva: Reserva = new Reserva();
  accion: string = "";

  fechaRegistro: Date = new Date();

  alertaOcupado:string="";

  zonaHorariaCliente: string;

  constructor(private imagenService: ImagenService, private activatedRoute: ActivatedRoute, private cotizacionService: CotizacionService,
    private reservaService: ReservaService, private toastr: ToastrService) { 
      this.zonaHorariaCliente = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log('Zona horaria del cliente:', this.zonaHorariaCliente);
    }

  ngOnInit(): void {
    this.obtenerImagen(4);
    this.obtenerUsuario();
    this.cargarCoti();
    this.obtenerUsuario();
  }


  cargarCoti(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.cotizacionService.buscarId(id).subscribe((cot) => {
          this.reserva.reCotiId = cot;
        })
      }
    })
  }

  cargarAccion(): void {
    this.activatedRoute.params.subscribe(params => {
      this.accion = params['accion']
      console.log(this.accion)

    })
  }

  obtenerUsuario() {
    // Recuperar el string del localStorage
    const userString = localStorage.getItem('userData');

    // Verificar si el string existe en el localStorage
    if (userString) {
      const login = JSON.parse(userString);

      this.reserva.usuId = login;
    }

  }



  crearReserva(): void {

    this.reserva.resFechaRegistro = this.fechaRegistro;
    this.reserva.resEstado = 1; //PENDIENTE

    if (this.reserva.resImagenRerserva === 0) {
      this.reserva.resComprobante = "Pendiente";
    } else {
      this.reserva.resComprobante = "EN REVISION";
    }

    const reserva: Date = new Date(this.reserva.resFechaEvento);
    const anio: number = reserva.getFullYear();
    const mes: number = reserva.getMonth() + 1;
    const dia: number = reserva.getDate() + 1;

    // this.reserva.resFechaEvento=reserva;

    

    this.reservaService.fechaOcupada(dia, mes, anio).subscribe(ocupado => {
      if (!ocupado) {
        alert("evento= "+this.reserva.resFechaEvento)
        this.alertaOcupado="Fecha disponible"
        this.reservaService.crearReserva(this.reserva).subscribe(res => {
          alert("reserva en revision")



        })
      }else{
        this.alertaOcupado="Fecha no disponible"
        this.toastr.error('La fecha que seleccionaste se encuentra ocupada actualmente', '', {
          timeOut: 2500
        });
      }
    })


  }


  validaciones(): Boolean {

    let ban: boolean = true;






    return ban;
  }










  /////////////////////////////////////////


  obtenerImagen(id: number): void {
    this.imagenService.obtenerImagenPorId(id)
      .subscribe(
        (response: HttpResponse<any>) => {
          const headers: HttpHeaders = response.headers;
          const contentType = headers.get('content-type');
          this.imageToShow = 'data:' + contentType + ';base64,' + this.arrayBufferToBase64(response.body);
        },
        error => {
          console.log('Error al obtener la imagen:', error);
        }
      );
  }

  // Función para convertir el array de bytes en una cadena base64
  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}

