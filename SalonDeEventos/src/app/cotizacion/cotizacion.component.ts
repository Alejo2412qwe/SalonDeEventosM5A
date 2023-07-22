import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../service/reserva.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reserva } from '../modelo/reserva';
import { ImagenService } from '../service/imagen.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit {

  imageToShow: any;

  constructor(private imagenService: ImagenService) { }
  ngOnInit(): void {
    this.obtenerImagen(4);
  }


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

