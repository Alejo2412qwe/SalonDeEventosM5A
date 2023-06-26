import { Persona } from "./persona";
import { Rol } from "./rol";

export class Usuario {

    usuId: number;
    usuNombreUsuario;
    usuContraseña: string;
    usuFechaRegistro: Date;
    usuPerId: Persona;
    rolId: Rol;


    constructor(
        usuId: number,
        usuNombreUsuario: string,
        usuContraseña: string,
        usuFechaRegistro: Date,
        usuPerId: Persona,
        rolId: Rol
    ) {
        this.usuId = usuId;
        this.usuNombreUsuario = usuNombreUsuario;
        this.usuContraseña = usuContraseña;
        this.usuFechaRegistro = usuFechaRegistro;
        this.usuPerId = usuPerId;
        this.rolId = rolId;
    }


}
