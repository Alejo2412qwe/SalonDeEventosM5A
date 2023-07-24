import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../service/reserva.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reserva } from '../modelo/reserva';
import { ImagenService } from '../service/imagen.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { CotizacionService } from '../service/cotizacion.service';
import { Usuario } from '../modelo/usuario';
import { Cotizacion } from '../modelo/cotizacion';
import { UploadFileService } from '../service/uploadFile.service';
import { FileModel } from '../modelo/fileModel';
import Swal from 'sweetalert2';

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

  alertaOcupado: string = "";

  usuario: Usuario = new Usuario();

  cotizacion: Cotizacion = new Cotizacion()

  numReserva: number = 0;

  selectedDate: Date = new Date();

  selectedFile: File | null = null;

  constructor(private imagenService: ImagenService, private activatedRoute: ActivatedRoute, private cotizacionService: CotizacionService,
    private reservaService: ReservaService, private toastr: ToastrService, private imageService: ImagenService, private fileService: UploadFileService) {
    // this.zonaHorariaCliente = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // console.log('Zona horaria del cliente:', this.zonaHorariaCliente);
  }

  ngOnInit(): void {
    this.cargarAccion();

  }


  cargarCoti(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.cotizacionService.buscarId(id).subscribe((cot) => {
          this.cotizacion = cot;

        })
      }
    })
  }

  cargarAccion(): void {
    this.activatedRoute.params.subscribe(params => {
      this.accion = params['accion']
      console.log(this.accion)

      if (this.accion === 'reservar') {
        this.obtenerUsuario();
        this.cargarCoti();

      } else {
        this.cargarReserva();

      }
    })
  }

  cargarReserva(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.reservaService.buscarId(id).subscribe((res) => {
          this.reserva = res;
          this.usuario = this.reserva.reCotiId.usuId;
          this.cotizacion = this.reserva.reCotiId
          this.numReserva = this.reserva.resId;
          this.selectedDate = this.reserva.resFechaEvento;
          console.log("hola= " + this.reserva.reCotiId.usuId.usuPerId.perCedula)
        })
      }
    })

  }

  formatDate(date: Date): string {
    // Formatea la fecha como 'yyyy-MM-dd' para que coincida con el formato del campo de entrada
    // console.log(date)
    const nacimiento: Date = new Date(date);
    const year = nacimiento.getFullYear();
    const month = ('0' + (nacimiento.getMonth() + 1)).slice(-2);
    const day = ('0' + nacimiento.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  validarReserva(id: number, est: number): void {
    this.reservaService.validarReserva(id, est).subscribe(
      res => {
        this.reserva = res;
      }
    )
  }

  // updateDate(event: any): void {
  //   // Convierte la cadena de fecha del campo de entrada en un objeto Date
  //   this.selectedDate = new Date(event.target.value);
  // }


  obtenerUsuario() {
    // Recuperar el string del localStorage
    const userString = localStorage.getItem('userData');

    // Verificar si el string existe en el localStorage
    if (userString) {
      const login = JSON.parse(userString);
      this.usuario = login;

    }

  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(): void {
    if (!this.selectedFile) {
      alert('Por favor, selecciona una imagen.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event: any) => {
      const imageData = new Uint8Array(event.target.result);
      this.imagenService.guardarImagen2(imageData)
        .subscribe(
          (imageId: string) => {
            alert('Imagen subida con éxito. ID de imagen: ' + imageId);
          },
          (error: any) => {
            alert('Error al subir la imagen. Por favor, inténtalo de nuevo.');
          }
        );
    };
    reader.readAsArrayBuffer(this.selectedFile);
  }

  crearReserva(): void {
    this.reserva.usuId = this.usuario;
    this.reserva.reCotiId = this.cotizacion;
    this.reserva.resFechaRegistro = this.fechaRegistro;
    this.reserva.resFechaEvento = this.selectedDate;
    this.reserva.resEstado = 1; //PENDIENTE

    console.log("EVENTOO= " + this.reserva.resFechaEvento)


    const reserva: Date = new Date(this.reserva.resFechaEvento);
    const anio: number = reserva.getFullYear();
    const mes: number = reserva.getMonth() + 1;
    const dia: number = reserva.getDate() + 1;

    // this.reserva.resFechaEvento=reserva;

    this.reservaService.fechaOcupada(dia, mes, anio).subscribe(ocupado => {

      console.log("dia= " + dia + "mes= " + mes + "anio= " + anio)
      if (!ocupado) {
        this.alertaOcupado = "Fecha disponible"

        if (this.selectedFiles && this.selectedFiles.length > 0 ) {
          this.fileService.uploadFiles(this.selectedFiles).subscribe(
            (response: FileModel[]) => {


              for (let file of response) {
                let url = "";
                let name = "";
                name = file.name;

                this.fileService.getFileName(name).subscribe(fileName => {
                  this.reserva.resComprobante = fileName.url;

                  console.log("URL= "+fileName.url)

                  this.reservaService.crearReserva(this.reserva).subscribe(res => {



                  })
                });

              }
              console.log('Archivos subidos correctamente:', response);


            },
            (error: any) => {
              console.error('Error al subir los archivos:', error);
              // Maneja el error adecuadamente
              // ...
            }
          );
        } else {
          this.reservaService.crearReserva(this.reserva).subscribe(res => {



          })
        }






      } else {
        this.alertaOcupado = "Fecha no disponible"
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
  selectedFiles: File[] = [];
  filePreviews: string[] = [];

  onFileChange(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
    this.filePreviews = [];
    console.log("select= " + this.selectedFiles.length)

    for (const file of this.selectedFiles) {
      this.getPreviewUrl(file).then((previewUrl) => {
        this.filePreviews.push(previewUrl);
        console.log("PREVIEW= " + this.filePreviews.length)

      });
    }
  }

  getPreviewUrl(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        resolve(e.target.result);
      };

      reader.onerror = (e) => {
        reject(e);
      };

      reader.readAsDataURL(file);
    });
  }

  uploadFiles(): void {
    this.fileService.uploadFiles(this.selectedFiles).subscribe(
      (response: FileModel[]) => {
        console.log('Archivos subidos correctamente:', response);
        // Realiza las operaciones necesarias con los archivos subidos
        // ...
      },
      (error: any) => {
        console.error('Error al subir los archivos:', error);
        // Maneja el error adecuadamente
        // ...
      }
    );
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

