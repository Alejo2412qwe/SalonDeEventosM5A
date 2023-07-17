import { Component, OnInit } from '@angular/core';
import { Salon } from '../modelo/salon';
import { SalonService } from '../service/salon.service';

@Component({
  selector: 'app-vistasalones',
  templateUrl: './vistasalones.component.html',
  styleUrls: ['./vistasalones.component.css']
})
export class VistasalonesComponent implements OnInit {

  constructor(private salservice: SalonService) {

  }

  salones: Salon[] = [];

  ngOnInit(): void {
    this.listarSalones();
  
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

}
