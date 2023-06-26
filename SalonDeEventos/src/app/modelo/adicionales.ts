import { Timestamp } from "rxjs";

export class Adicionales {
    adiId: number = 0;
    cotiId: number = 0;
    prodId: number = 0;
    adiCantidad: number = 0;
    adiFechaRegistro: Date = new Date(0);

    constructor(
        adiId: number,
        cotiId: number,
        prodId: number,
        adiCantidad: number,
        adiFechaRegistro: Date
    ) {
        this.adiId = adiId;
        this.cotiId = cotiId;
        this.prodId = prodId;
        this.adiCantidad = adiCantidad;
        this.adiFechaRegistro = adiFechaRegistro;
    }

}


