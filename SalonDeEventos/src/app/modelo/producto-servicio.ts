import { Timestamp } from "rxjs";

export class ProductoServicio {
    prodId: number = 0;
    prodNombre: string = "";
    prodPrecio: number = 0;
    prodDescripcion: string = "";
    prodEstado: boolean = false;
    prodFechaRegistro: Date = new Date(0);
    tipId: number = 0;
    catId: number = 0;

    constructor(
        prodId: number,
        prodNombre: string,
        prodPrecio: number,
        prodDescripcion: string,
        prodEstado: boolean,
        prodFechaRegistro: Date,
        tipId: number,
        catId: number
    ) {
        this.prodId = prodId;
        this.prodNombre = prodNombre;
        this.prodPrecio = prodPrecio;
        this.prodDescripcion = prodDescripcion;
        this.prodEstado = prodEstado;
        this.prodFechaRegistro = prodFechaRegistro;
        this.tipId = tipId;
        this.catId = catId;
    }
}
