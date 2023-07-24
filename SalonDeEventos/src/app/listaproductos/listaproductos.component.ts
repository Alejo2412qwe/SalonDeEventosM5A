import { Component, OnInit } from '@angular/core';
import { ProductoServicio } from '../modelo/producto-servicio';
import { productoService } from '../service/producto.service';
import Swal from 'sweetalert2';
import { ImgProductoService } from '../service/imgProducto.service';
import { ImgProducto } from '../modelo/imgProducto';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from '../modelo/categoria';

@Component({
  selector: 'app-listaproductos',
  templateUrl: './listaproductos.component.html',
  styleUrls: ['./listaproductos.component.css']
})
export class ListaproductosComponent implements OnInit {

  productoAct: ProductoServicio[] = [];
  productoInact: ProductoServicio[] = [];
  busquedaAct: string = "";
  busquedaInAct: string = "";
  categoria: Categoria = new Categoria;
  estado: string = "ACTIVOS";
  categorias: Categoria[] = [];


  constructor(private ProductoService: productoService, private imgProductoService: ImgProductoService,
    private categoriaService: CategoriaService) {
  }

  ngOnInit(): void {
    this.listarProductosAct();
    this.listarProductosInAct();
    this.cargarCategorias();
  }


  openCrearCate() {
    Swal.fire({
      title: 'Agregar Categoría',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nombre">',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
        this.categoria.catNombre = name;
        this.crearCategoria();
      }
    });
  }


  crearCategoria(): void {
    this.categoriaService.crearCategoria(this.categoria).subscribe(
      cat => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Categoría registrada exitosamente',
          showConfirmButton: true,
        });
        this.cargarCategorias()
      }

    )
  }

  cargarCategorias(): void {

    this.categoriaService.getCategoria().subscribe(
      categoriaArray => {
        this.categorias = categoriaArray
      }
    );
  }


  listarProductosAct(): void {
    this.ProductoService.listarEst(1).subscribe(
      producto => this.productoAct = producto
    );
  }

  busquedaPSAct(): void {
    this.ProductoService.buscarProd(this.busquedaAct, 1).subscribe(
      user => {
        console.log("buscando")
        this.productoAct = user
      }
    );
  }

  listarProductosInAct(): void {
    this.ProductoService.listarEst(0).subscribe(
      producto => this.productoInact = producto
    );
  }

  busquedaPSInAct(): void {
    this.ProductoService.buscarProd(this.busquedaInAct, 0).subscribe(
      user => {
        console.log("buscando")
        this.productoInact = user
      }

    );
  }

  eliminar(id: number): void {
    console.log("id= " + id)
    Swal.fire({
      title: `¿Seguro que desea eliminar el producto?`,
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
        this.ProductoService.actualizarEst(id, 0).subscribe(user => {

          this.listarProductosAct()
          this.listarProductosInAct()

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Producto eliminado exitosamente`,
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

  activar(id: number): void {
    console.log("id= " + id)
    Swal.fire({
      title: `¿Seguro que desea habilitar el producto?`,
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
        this.ProductoService.actualizarEst(id, 1).subscribe(user => {

          this.listarProductosAct()
          this.listarProductosInAct()

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Producto habilitado exitosamente`,
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
