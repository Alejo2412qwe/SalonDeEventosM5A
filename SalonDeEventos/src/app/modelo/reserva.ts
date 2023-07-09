import { Cotizacion } from "./cotizacion";
import { Usuario } from "./usuario";

export class Reserva {

    resId: number;
    resEstado: number;
    resComprobante: string;
    resFechaRegistro: Date;
    resFechaEvento:Date;
    reCotiId: Cotizacion;
    usuId: Usuario;

    constructor(
        resId?: number,
        resEstado?: number,
        resComprobante?: string,
        resFechaRegistro?: Date,
        resFechaEvento?:Date,
        reCotiId?: Cotizacion,
        usuId?: Usuario
    ) {
        this.resId = resId||0;
        this.resEstado = resEstado||0;
        this.resComprobante = resComprobante||"";
        this.resFechaRegistro = resFechaRegistro||new Date;
        this.resFechaEvento = resFechaEvento||new Date;
        this.reCotiId = reCotiId||new Cotizacion;
        this.usuId = usuId|| new Usuario;
    }
}
