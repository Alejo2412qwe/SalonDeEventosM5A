import { Cotizacion } from "./cotizacion";
import { Usuario } from "./usuario";

export class Reserva {

    resId: number;
    resEstado: boolean;
    resComprobante: string;
    resFechaRegistro: Date;
    reCotiId: Cotizacion;
    usuario: Usuario;

    constructor(
        resId: number,
        resEstado: boolean,
        resComprobante: string,
        resFechaRegistro: Date,
        reCotiId: Cotizacion,
        usuario: Usuario
    ) {
        this.resId = resId;
        this.resEstado = resEstado;
        this.resComprobante = resComprobante;
        this.resFechaRegistro = resFechaRegistro;
        this.reCotiId = reCotiId;
        this.usuario = usuario;
    }
}
