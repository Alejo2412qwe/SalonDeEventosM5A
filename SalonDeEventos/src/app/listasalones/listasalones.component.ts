import { Component, OnInit } from '@angular/core';
import { SalonService } from '../service/salon.service';
import { Salon } from '../modelo/salon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listasalones',
  templateUrl: './listasalones.component.html',
  styleUrls: ['./listasalones.component.css']
})
export class ListasalonesComponent implements OnInit {

  salAc: SalonService[] = [];
  busquedaAct: string = "";
  busquedaInAct: string = "";
  salones: Salon[] = [];

  constructor(private salonService: SalonService) { }

  ngOnInit(): void {
    this.listaSalones();
    this.listarSalonesAct();

  }

  listarSalonesAct(): void {
    this.salonService.listarEst(1).subscribe(
      salon => this.salAc = salon
    );
  }

  busquedaPSAct(): void {
    this.salonService.buscarSal(this.busquedaAct).subscribe(
      sal => {
        this.salAc = sal
      }
    );
  }

  listaSalones(): void {
    this.salonService.getSalon().subscribe(
      salones => {
        this.salones = salones
      }
    );
  }

  eliminar(id: number): void {
    Swal.fire({
      title: `¿Seguro que desea eliminar el salon?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.salonService.delete(id).subscribe(salon => {
          this.salonService.getSalon().subscribe(salones => this.salones = salones)

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Salon eliminado exitosamente`,
            showConfirmButton: true,
            timer: 1500
          })
        })
        Swal.fire('Saved!', '', 'success')

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}
