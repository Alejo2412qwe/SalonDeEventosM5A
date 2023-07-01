import { Component } from '@angular/core';
import { ProductoServicio } from '../modelo/producto-servicio';
import { productoService } from '../service/producto.service';
import { CategoriaService } from '../service/categoria.service';
import { TipoService } from '../service/tipo.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Categoria } from '../modelo/categoria';
import { Tipo } from '../modelo/tipo';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  constructor(private productoService: productoService, private categoriaService: CategoriaService, private tipoService: TipoService,
    private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.cargarTipos()
  }

  tipos: Tipo[] = [];
  producto: ProductoServicio = new ProductoServicio();
  categoria: Categoria = new Categoria();
  tipo: Tipo = new Tipo();
  seleccionados: Tipo = new Tipo;

  cargarTipos(): void {

    let tipoSELEC: Tipo = new Tipo()
    tipoSELEC.tipId = 0;
    tipoSELEC.tipNombre = 'Seleccione una categoria';
    this.tipos.push(tipoSELEC);
    this.tipoService.getTipos().subscribe(
      tiposArray => {
        for (let tipo of tiposArray) {
          this.tipos.push(tipo)
        }
      }
    );
  }

  registrar(): void {

    this.tipo.tipNombre = this.seleccionados.tipNombre;
    
    for (const tip of this.tipos) {
      if (this.tipo.tipNombre === tip.tipNombre) {
        this.producto.tipId = tip;
        break;
      }
    }
    this.productoService.crearProducto(this.producto).subscribe(
      response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro exitoso',
          showConfirmButton: true
        }).then(() => {
          location.reload();
        });
      });
  };
};
