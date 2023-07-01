import { Timestamp } from "rxjs";
import { Tipo } from "./tipo";
import { Categoria } from "./categoria";

export class ProductoServicio {
    prodId: number = 0;
    prodNombre: string = "";
    prodPrecio: number = 0;
    prodDescripcion: string = "";
    prodEstado: number = 0;
    prodFechaRegistro: Date = new Date(0);
    tipId: Tipo;
    catId: Categoria;

    constructor(
        prodId?: number,
        prodNombre?: string,
        prodPrecio?: number,
        prodDescripcion?: string,
        prodEstado?: number,
        prodFechaRegistro?: Date,
        tipId?: Tipo,
        catId?: Categoria
    ) {
        this.prodId = prodId || 0;
        this.prodNombre = prodNombre || "";
        this.prodPrecio = prodPrecio || 0;
        this.prodDescripcion = prodDescripcion || "";
        this.prodEstado = prodEstado || 0;
        this.prodFechaRegistro = prodFechaRegistro || new Date;
        this.tipId = tipId || new Tipo;
        this.catId = catId || new Categoria;
    }
}
