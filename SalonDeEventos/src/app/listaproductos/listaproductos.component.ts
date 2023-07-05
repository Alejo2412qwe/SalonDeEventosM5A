import { Component, OnInit } from '@angular/core';
import { ProductoServicio } from '../modelo/producto-servicio';
import { productoService } from '../service/producto.service';

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

}
