import { Persona } from "./persona";
import { Rol } from "./rol";

export class Usuario {

    usuId: number;
    usuNombreUsuario: string;
    usuContrasena: string;
    usuFechaRegistro: Date;
    usuPerId: Persona;
    rolId: Rol;


    constructor(
        usuId?: number,
        usuNombreUsuario?: string,
        usuContraseña?: string,
        usuFechaRegistro?: Date,
        usuPerId?: Persona,
        rolId?: Rol
    ) {
        this.usuId = usuId || 0;
        this.usuNombreUsuario = usuNombreUsuario || "";
        this.usuContrasena = usuContraseña || "";
        this.usuFechaRegistro = usuFechaRegistro || new Date;
        this.usuPerId = usuPerId || new Persona;
        this.rolId = rolId || new Rol;
    }


}
