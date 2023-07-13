import { Component } from '@angular/core';
import { SalonService } from '../service/salon.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router, private toastr: ToastrService, private imgSalonService: ImgSalonService, private activatedRoute: ActivatedRoute) { }

  accion: string = "";
  seleccionados: Empresa = new Empresa;
  salon: Salon = new Salon();
  empresa: Empresa = new Empresa();

  ngOnInit(): void {
    this.cargarAccion()
  }

  registrarSalon(): void {

    this.EmpresaService.getEmpresaPorId(1).subscribe(emp => {

      this.salon.empId = emp;
      this.salon.salEstado = 1;
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

  cargarSalon(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.salonService.getSalonId(id).subscribe((salon) => {
          this.salon = salon
        })
      }
    })
  }


  cargarAccion(): void {
    this.activatedRoute.params.subscribe(params => {
      this.accion = params['accion']
      console.log(this.accion)
      if (this.accion === 'editar') {
        this.cargarSalon();
      }
    })
  }
}
