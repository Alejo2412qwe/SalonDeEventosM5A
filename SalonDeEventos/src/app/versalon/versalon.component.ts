import { Component, OnInit } from '@angular/core';
import { Salon } from '../modelo/salon';
import { SalonService } from '../service/salon.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-versalon',
  templateUrl: './versalon.component.html',
  styleUrls: ['./versalon.component.scss']
})
export class VersalonComponent implements OnInit {

  constructor(private salservice: SalonService, private activatedRoute: ActivatedRoute) {

  }

  salones: Salon[] = [];
  salon: Salon = new Salon();


  ngOnInit(): void {
    this.listarSalones();
    this.cargarUsu();

  }

  listarSalones(): void {
    this.salservice.getSalon().subscribe(
      salones => {
        this.salones = salones;
        console.log(this.salones); // Imprime los salones en la consola
      },
      error => {
        console.log('Error al obtener los salones:', error);
      }
    );
  }

  cargarUsu(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.salservice.buscarSalon(id).subscribe((sal) => {
          this.salon = sal; 
          // Asignar el objeto 'sal' completo en lugar de 'sal.salId'
          console.log("rol= " + this.salon.salNombre)

        })
      }
    })
  }
  

}
