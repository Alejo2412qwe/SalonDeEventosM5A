import { Component } from '@angular/core';
import { SalonService } from '../service/salon.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImgSalonService } from '../service/imgSalon.service';
import { Salon } from '../modelo/salon';
import Swal from 'sweetalert2';
import { Empresa } from '../modelo/empresa';
import { EmpresaService } from '../service/empresa.service';

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent {

  constructor(private salonService: SalonService, private EmpresaService: EmpresaService,
    private router: Router, private toastr: ToastrService, private imgSalonService: ImgSalonService) { }

  seleccionados: Empresa = new Empresa;
  salon: Salon = new Salon();
  empresa: Empresa = new Empresa();

  registrarSalon(): void {

    this.EmpresaService.getEmpresaPorId(1).subscribe(emp => {

      this.salon.empId = emp;

      this.salonService.crearSalon(this.salon).subscribe(
        response => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro exitoso',
            showConfirmButton: true
          }).then(() => {
            location.reload();
          })
        })
    })
  }
}
