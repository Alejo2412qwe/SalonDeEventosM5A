import { Component } from '@angular/core';
import { ReservaService } from '../service/reserva.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reserva } from '../modelo/reserva';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent {
  reservas: Reserva[] = [];

  idUsu: number = 0;

  estado: number = 1;


  constructor(private reservaService: ReservaService, private activatedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cargarUsu()
    this.listarReservas()
  }

  listarReservas(): void {

    this.reservaService.misReservas(this.idUsu, this.estado).subscribe(
      // this.reservaService.getReserva().subscribe(
      (reservas: Reserva[]) => {
        this.reservas = reservas;
      }
    );
  }


  cargarUsu(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.idUsu = id;
      }
    })
  }

  estados(est: number): string {
    let estado: string = "";

    switch (est) {
      case 0:
        estado = "Rechazado";
        break;
      case 1:
        estado = "Pendiente";
        break;
      case 2:
        estado = "Aprobado";
        break;

    }

    return estado;
  }

}
