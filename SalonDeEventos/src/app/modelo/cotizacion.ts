import { Salon } from "./salon";
import { Usuario } from "./usuario";

export class Cotizacion {
    cotiId: number = 0;
    cotiTipoEvento: string = "";
    cotiFechaEvento: Date = new Date(0);
    cotiDescripcion: string = "";
    cotiEstado: boolean = false;
    cotiMonto: number = 0;
    cotiHoraFin: Date = new Date(0);
    cotiHoraInicio: Date = new Date(0);
    cotiFechaRegistro: Date = new Date(0);
    salId: Salon = new Salon;
    usuId: Usuario = new Usuario;

    constructor() {
        this.cotiId = 0;
        this.cotiTipoEvento = "";
        this.cotiFechaEvento = new Date(0);
        this.cotiDescripcion = "";
        this.cotiEstado = false;
        this.cotiMonto = 0;
        this.cotiHoraFin = new Date(0);
        this.cotiHoraInicio = new Date(0);
        this.cotiFechaRegistro = new Date(0);
        this.salId = new Salon();
        this.usuId = new Usuario();
    }
}
