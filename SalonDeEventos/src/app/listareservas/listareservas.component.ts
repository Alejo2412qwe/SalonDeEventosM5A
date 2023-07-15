import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../service/reserva.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reserva } from '../modelo/reserva';

@Component({
  selector: 'app-listareservas',
  templateUrl: './listareservas.component.html',
  styleUrls: ['./listareservas.component.css']
})
export class ListareservasComponent implements OnInit {
  reservas: Reserva[] = [];

  constructor(private reservaService: ReservaService) { }

  ngOnInit(): void {
    this.listarReservas()
  }
  listarReservas(): void {
    this.reservaService.getReserva().subscribe(
      (reservas: Reserva[]) => {
        this.reservas = reservas;
      }
    );
  }


}
