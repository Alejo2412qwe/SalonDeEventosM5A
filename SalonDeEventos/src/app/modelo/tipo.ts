import { ProductoServicio } from "./producto-servicio";

export class Tipo {

    tipId: number = 0;
    tipNombre: string = "";
    tipFechaRegistro: Date = new Date;
    listaProductos: ProductoServicio = ProductoServicio;

    constructor(
        tipId: number,
        tipNombre: string,
        tipFechaRegistro: Date,
        listaProductos: ProductoServicio[]
    ) {
        this.tipId = tipId;
        this.tipNombre = tipNombre;
        this.tipFechaRegistro = tipFechaRegistro;
        this.listaProductos = listaProductos;
    }
}
