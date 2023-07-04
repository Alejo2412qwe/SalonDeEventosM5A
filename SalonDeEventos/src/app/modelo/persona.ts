import { Rol } from "./rol";

export class Persona {
    perId: number|undefined;
    perCedula: string;
    perNombre: string;
    perApellido: string;
    perCorreo: string;
    perDireccion: string;
    perTelefono: string;
    perFechaNacimiento: Date;


    constructor(
        perId?: number,
        perCedula?: string,
        perNombre?: string,
        perApellido?: string,
        perCorreo?: string,
        perDireccion?: string,
        perTelefono?: string,
        perFechaNacimiento?: Date,
 
    ) {
        this.perId = perId;
        this.perCedula = perCedula || "";
        this.perNombre = perNombre || "";
        this.perApellido = perApellido || "";
        this.perCorreo = perCorreo || "";
        this.perDireccion = perDireccion || "";
        this.perTelefono = perTelefono || "";
        this.perFechaNacimiento = perFechaNacimiento || new Date;

    }
}
