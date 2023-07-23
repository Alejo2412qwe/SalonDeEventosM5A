import { Component, ChangeDetectorRef } from '@angular/core';
import { productoService } from '../service/producto.service';
import { ImgProductoService } from '../service/imgProducto.service';
import { CategoriaService } from '../service/categoria.service';
import { ProductoServicio } from '../modelo/producto-servicio';
import { Adicionales } from '../modelo/adicionales';
import { Cotizacion } from '../modelo/cotizacion';
import { Usuario } from '../modelo/usuario';
import { CotizacionService } from '../service/cotizacion.service';
import { Salon } from '../modelo/salon';
import { ActivatedRoute, Router } from '@angular/router';
import { SalonService } from '../service/salon.service';
import { AdicionalesService } from '../service/adicionales.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent {

  productoAct: ProductoServicio[] = [];
  fechaRegistro: Date = new Date();
  adicionales: Adicionales[] = [];
  nuevoAdicional: Adicionales = new Adicionales();

  cotizacion: Cotizacion = new Cotizacion();
  salon: Salon = new Salon();
  usuario: Usuario = new Usuario();

  selectedTimeIni: string = ""; // Puedes utilizar string ya que el valor del input time es un string en formato "HH:mm"
  selectedTimeFin: string = ""; // Puedes utilizar string ya que el valor del input time es un string en formato "HH:mm"


  constructor(private ProductoService: productoService, private imgProductoService: ImgProductoService,
    private categoriaService: CategoriaService, private changeDetectorRef: ChangeDetectorRef,
    private cotizacionService: CotizacionService, private activatedRoute: ActivatedRoute,
    private salservice: SalonService, private adicionalesService: AdicionalesService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.listarProductosAct()
    this.obtenerUsuario()
    this.obtenerSalon()
  }


  obtenerSalon(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.salservice.buscarSalon(id).subscribe((sal) => {
          this.salon = sal;
          // Asignar el objeto 'sal' completo en lugar de 'sal.salId'
          console.log("rol= " + this.salon.salNombre)
          this.cotizacion.salId = this.salon;

        })
      }
    })
  }


  obtenerUsuario() {
    // Recuperar el string del localStorage
    const userString = localStorage.getItem('userData');

    // Verificar si el string existe en el localStorage
    if (userString) {
      const login = JSON.parse(userString);

      this.usuario = login;

      this.cotizacion.usuId = this.usuario;
    }

  }

  listarProductosAct(): void {
    this.ProductoService.listarEst(1).subscribe(
      producto => this.productoAct = producto
    );
  }

  agregarAdicional(p: ProductoServicio) {
    // const 

    this.nuevoAdicional.prodId = p;
    console.log("cant= " + this.nuevoAdicional.adiCantidad)
    this.adicionales.push(this.nuevoAdicional);

    console.log("add= " + this.adicionales.length)

    this.nuevoAdicional = new Adicionales()

    this.calcularMonto();
  }

  quitarAdiccional(id: number) {
    this.adicionales = this.adicionales.filter(producto => producto.prodId.prodId !== id);
    console.log("remove= " + this.adicionales.length)
    this.calcularMonto();
  }

  calcularMonto() {
    this.cotizacion.cotiMonto = 0;
    for (let add of this.adicionales) {
      this.cotizacion.cotiMonto = this.cotizacion.cotiMonto + (add.prodId.prodPrecio * add.adiCantidad)
    }

    const diferenciaTiempo = this.calcularTiempoEntreHoras();
    const [hours, minutes] = diferenciaTiempo.split(':').map(Number); // Separamos las horas y minutos del string
    console.log("H" + hours + "   M" + minutes);

    this.cotizacion.cotiMonto = this.cotizacion.cotiMonto + (this.salon.salCostoHora * hours)

    let min = 0;

    if (minutes > 0) {
      min = minutes / 60;
    }

    this.cotizacion.cotiMonto = this.cotizacion.cotiMonto + (this.salon.salCostoHora * min)

    this.changeDetectorRef.detectChanges();


  }

  crearCotizacion(): void {

    this.cotizacion.cotiEstado = 1;

    this.cotizacion.cotiHoraInicio = this.selectedTimeIni;
    this.cotizacion.cotiHoraFin = this.selectedTimeFin;

    this.cotizacion.cotiFechaRegistro = this.fechaRegistro;


    this.cotizacionService.crearCotizacion(this.cotizacion).subscribe(
      coti => {
        this.crearAdicionales(coti);
        Swal.fire({
          title: `¿Desea continuar con la reserva?`,
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Si',
          denyButtonText: 'Quizas mas tarde',
          customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(["cot","reservar", coti.cotiId]);

          } else if (result.isDenied) {
            Swal.fire('Verifique sus datos antes de cambiarlos', '', 'info')
          }
        })
      }
    );
  }

  crearAdicionales(cot: Cotizacion): void {
    for (let add of this.adicionales) {

      add.cotiId = cot;
      this.adicionalesService.crearAdicional(add).subscribe();


    }
  }

  parseTimeToDate(timeString: string): Date {
    const today = new Date(); // Obtenemos la fecha actual
    const [hours, minutes] = timeString.split(':').map(Number); // Separamos las horas y minutos del string

    // Creamos un nuevo objeto Date con la fecha actual y las horas y minutos seleccionados
    const selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);

    return selectedDate;
  }

  calcularTiempoEntreHoras(): string {
    const horaIni = this.parseTimeToDate(this.selectedTimeIni);
    const horaFin = this.parseTimeToDate(this.selectedTimeFin);

    if (horaIni && horaFin) {
      console.log("VALIDO");

      let diferenciaEnMilisegundos = horaFin.getTime() - horaIni.getTime();

      // Ajustamos la diferencia si la hora de fin es menor que la hora de inicio (pasamos a un día completo)
      if (horaFin < horaIni) {
        const diferenciaDiaCompleto = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
        diferenciaEnMilisegundos += diferenciaDiaCompleto;
      }

      // Calculamos las horas y minutos de la diferencia
      const horas = Math.floor(diferenciaEnMilisegundos / 3600000); // 1 hora tiene 3600000 milisegundos
      const minutos = Math.floor((diferenciaEnMilisegundos % 3600000) / 60000); // 1 minuto tiene 60000 milisegundos

      // Creamos una cadena con el formato "HH:mm" para mostrar la diferencia
      const tiempoEntreHoras = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;

      return tiempoEntreHoras;
    }

    return "no vale";
  }




}
