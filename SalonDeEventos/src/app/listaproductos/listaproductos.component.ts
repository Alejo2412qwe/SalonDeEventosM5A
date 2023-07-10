import { Component, OnInit } from '@angular/core';
import { ProductoServicio } from '../modelo/producto-servicio';
import { productoService } from '../service/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listaproductos',
  templateUrl: './listaproductos.component.html',
  styleUrls: ['./listaproductos.component.css']
})
export class ListaproductosComponent implements OnInit {

  producto: ProductoServicio[] = [];

  constructor(private ProductoService: productoService) {
  }

  ngOnInit(): void {
    this.ProductoService.getProducto().subscribe(
      producto => this.producto = producto
    );

  }

  eliminar(id: number): void {
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
        this.ProductoService.delete(id).subscribe(user => {
          this.ProductoService.getProducto().subscribe(productos => this.producto = productos)

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Cliente eliminado exitosamente`,
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
