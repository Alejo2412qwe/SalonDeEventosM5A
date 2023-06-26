import { Salon } from "./salon";
import { Usuario } from "./usuario";

export class Cotizacion {
    cotiId: number;
    cotiTipoEvento: string;
    cotiFechaEvento: Date;
    cotiDescripcion: string;
    cotiEstado: boolean;
    cotiMonto: number;
    cotiHoraFin: Date;
    cotiHoraInicio: Date;
    cotiFechaRegistro: Date;
    salId: Salon;
    usuId: Usuario;

    constructor(
        cotiId: number,
        cotiTipoEvento: string,
        cotiFechaEvento: Date,
        cotiDescripcion: string,
        cotiEstado: boolean,
        cotiMonto: number,
        cotiHoraFin: Date,
        cotiHoraInicio: Date,
        cotiFechaRegistro: Date,
        salId: Salon,
        usuId: Usuario
    ) {
        this.cotiId = cotiId;
        this.cotiTipoEvento = cotiTipoEvento;
        this.cotiFechaEvento = cotiFechaEvento;
        this.cotiDescripcion = cotiDescripcion;
        this.cotiEstado = cotiEstado;
        this.cotiMonto = cotiMonto;
        this.cotiHoraFin = cotiHoraFin;
        this.cotiHoraInicio = cotiHoraInicio;
        this.cotiFechaRegistro = cotiFechaRegistro;
        this.salId = salId;
        this.usuId = usuId;
    }
}
