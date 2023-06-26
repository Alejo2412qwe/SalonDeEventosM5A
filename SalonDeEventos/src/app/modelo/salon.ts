import { Cotizacion } from "./cotizacion";
import { Empresa } from "./empresa";

export class Salon {

    salId: number ;
    salNombre: string;
    salDireccion: string;
    salCapacidad: number;
    salCostoHora: number;
    salEstado: boolean;
    salLongitud: number;
    salLatitud: number;
    salFechaRegistro: Date;
    listaCotizaciones: Cotizacion;
    empresa: Empresa;

    constructor(
        salId: number,
        salNombre: string,
        salDireccion: string,
        salCapacidad: number,
        salCostoHora: number,
        salEstado: boolean,
        salLongitud: number,
        salLatitud: number,
        salFechaRegistro: Date,
        listaCotizaciones: Cotizacion,
        empresa: Empresa
    ) {
        this.salId = salId;
        this.salNombre = salNombre;
        this.salDireccion = salDireccion;
        this.salCapacidad = salCapacidad;
        this.salCostoHora = salCostoHora;
        this.salEstado = salEstado;
        this.salLongitud = salLongitud;
        this.salLatitud = salLatitud;
        this.salFechaRegistro = salFechaRegistro;
        this.listaCotizaciones = listaCotizaciones;
        this.empresa = empresa;
    }
}
