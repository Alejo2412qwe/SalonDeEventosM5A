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

  salAc: Salon[] = [];
  salInac: Salon[] = [];
  busquedaAct: string = "";
  busquedaInAct: string = "";


  constructor(private salonService: SalonService) { }

  ngOnInit(): void {
    this.listarSalonesAct()
    this.listarSalonesInact()
  }

  listarSalonesAct(): void {
    this.salonService.listarEst(1).subscribe(
      salon => this.salAc = salon
    );
  }

  listarSalonesInact(): void {
    this.salonService.listarEst(0).subscribe(
      salon => this.salInac = salon
    );
  }

  busquedaPSAct(): void {
    console.log(this.busquedaAct)
    this.salonService.buscarSal(this.busquedaAct, 1).subscribe(
      sal => {
        this.salAc = sal
      }
    );
  }

  busquedaPSInact(): void {
    console.log(this.busquedaAct)
    this.salonService.buscarSal(this.busquedaAct, 0).subscribe(
      sal => {
        this.salAc = sal
      }
    );
  }

  actualizarEst(id: number, est:number): void {
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
        this.salonService.actualizarEst(id,est).subscribe(salon => {

          this.listarSalonesAct();
          this.listarSalonesInact();

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
