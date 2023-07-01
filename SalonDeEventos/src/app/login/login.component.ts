import { Component, OnInit } from '@angular/core';
import { Persona } from '../modelo/persona';
import { PersonaService } from '../service/persona.service';
import { Router } from '@angular/router'
import { Usuario } from '../modelo/usuario';
import { UsuarioService } from '../service/usuario.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { RolService } from '../service/rol.service';
import { Rol } from '../modelo/rol';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private personaService: PersonaService, private usuarioService: UsuarioService, private rolService: RolService,
    private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getrol()
  }

  usuariologin: string = "";
  passlogin: string = "";
  // usuarioLogin:Usuario=new Usuario;

  login(): void {
    if (this.validacionesLogin()) {
      this.usuarioService.usuarioExiste(this.usuariologin).subscribe(existe => {
        console.log("boolean= " + existe);
        if (existe) {

          this.usuarioService.login(this.usuariologin, this.passlogin).subscribe(login => {
            if (login) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Bienvenido',
                showConfirmButton: false,
                timer: 2000
              }).then(() => {
                this.router.navigate(["menu"]);
              });
            } else {
              this.toastr.error('', 'Contraseña incorrecta', {
                timeOut: 3000
              });
            }

          });
        } else {
          this.toastr.error('', 'Nombre de usuario incorrecto', {
            timeOut: 3000
          });
        }
      });
    }
  }

  validacionesLogin(): boolean {
    // const fechaActual = new Date();
    // console.log(fechaActual);
    let tiempo: number = 2500;

    let ban: boolean = true;

    if (this.usuariologin.length === 0) {
      this.toastr.error('Ingrese su nombre de usuario', '', {
        timeOut: tiempo
      });
      ban = false;
    }
    if (this.passlogin.length === 0) {
      this.toastr.error('Ingrese su contraseña', '', {
        timeOut: tiempo
      });
      ban = false;
    }

    return ban;
  }
  ////////////REGISTRO///////////////////////////////////////


  // personaId: Persona = new Persona();
  usuario: Usuario = new Usuario();
  confirmarPass = "";
  persona: Persona = new Persona();
  rol: Rol = new Rol();

  getrol(): void {
    console.log("holaaaaa");
    this.rolService.getRol(3).subscribe(rol => {
      this.rol.rolId = rol.rolId;
      // this.usuario.rolId = rol;

      // this.usuario.rolId = this.rol;
      // console.log("NOmbre " + this.rol.rolId)
    });

  }

  registrar(): void {
    if (this.validacionesRegistro()) {

      this.personaService.crearPersona(this.persona).subscribe(
        response => {
          this.rolService.getRol(3).subscribe(rol => {
            this.rol.rolId = rol.rolId;
            this.usuario.rolId = this.rol;

            this.personaService.getId().subscribe(data => {
              this.persona.perId = data;
              this.usuario.usuPerId = this.persona;

              console.log("this.usuario.rolid= " + this.usuario.rolId?.rolId);

              this.usuarioService.crearUsuario(this.usuario).subscribe(response => {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Registro exitoso',
                  showConfirmButton: true
                  // timer: 3500
                }).then(() => {
                  location.reload();
                });
              });
            });
          });
        }
      )
    }
  }

  validacionesRegistro(): boolean {
    // const fechaActual = new Date();
    // console.log(fechaActual);
    let tiempo: number = 4000;

    let ban: boolean = true;

    if (this.persona.perApellido.length === 0) {
      this.toastr.error('Debe ingresar su apellido', '', {
        timeOut: tiempo
      });
      ban = false;
    }
    if (this.persona.perApellido.length === 0) {
      this.toastr.error('Debe ingresar su apellido', '', {
        timeOut: tiempo
      });
      ban = false;
    }

    if (this.persona.perNombre.length === 0) {
      this.toastr.error('Debe ingresar su nombre', '', {
        timeOut: tiempo
      });
      ban = false;
    }

    if (this.persona.perCorreo.length === 0) {
      this.toastr.error('Debe ingresar su correo', '', {
        timeOut: tiempo
      });
      ban = false;
    }


    //edad
    let fechaActual = new Date();
    let edadMinima = 18;


    if (this.calcularEdad() < edadMinima) {
      ban = false;
      this.toastr.error('Debe ser mayor de edad para registrarse', '', {
        timeOut: 3000
      });
    }

    if (this.persona.perNombre.length === 0) {
      this.toastr.error('Debe ingresar su nombre', '', {
        timeOut: tiempo
      });
      ban = false;
    }

    if (this.persona.perTelefono.length === 0) {
      this.toastr.error('Debe ingresar su apellido', '', {
        timeOut: tiempo
      });
      ban = false;
    }

    if (this.usuario.usuContrasena.length === 0) {
      this.toastr.error('Debe ingresar su contraseña', '', {
        timeOut: tiempo
      });
      ban = false;
    }

    if (this.usuario.usuNombreUsuario.length === 0) {
      this.toastr.error('Debe ingresar su nombre de usuario', '', {
        timeOut: tiempo
      });
      ban = false;
    } else {
      this.usuarioService.usuarioExiste(this.usuario.usuNombreUsuario).subscribe(existe => {

        if (existe) {
          this.toastr.error('Este usuario ya existe', '', {
            timeOut: tiempo
          });
          ban = false;
        }
      });
    }

    if (this.confirmarPass.length === 0) {
      this.toastr.error('Debe confirmar su contraseña', '', {
        timeOut: tiempo
      });
      ban = false;
    } else {
      if (this.confirmarPass !== this.usuario.usuContrasena) {
        this.toastr.error('Las 2 contraseñas tienen que coincidir', '', {
          timeOut: tiempo
        });
        ban = false;
      }
    }

    return ban;
  }

  calcularEdad(): number {
    console.log("nacimiento" + this.persona.perFechaNacimiento)
    const fechaActual: Date = new Date();
    console.log("HOY" + fechaActual)
    const anioActual: number = fechaActual.getFullYear();
    const mesActual: number = fechaActual.getMonth() + 1;
    const diaActual: number = fechaActual.getDate();

    const nacimiento: Date = new Date(this.persona.perFechaNacimiento);
    const anioNacimiento: number = nacimiento.getFullYear();
    const mesNacimiento: number = nacimiento.getMonth() + 1;
    const diaNacimiento: number = nacimiento.getDate() + 1;
    // console.log("nacimiento" + nacimiento)

    let edad: number = anioActual - anioNacimiento;

    // Verificar si aún no ha cumplido años en el presente año
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
      edad--;
    }
    // console.log("EDAD" + edad)

    return edad;
  }

  numeros(event: KeyboardEvent) {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '-', ',', 'Backspace', 'Delete', 'Tab'];
    const inputKey = event.key;

    if (!allowedKeys.includes(inputKey)) {
      event.preventDefault();
    }
  }
}
