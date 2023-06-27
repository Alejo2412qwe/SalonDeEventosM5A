import { Component, OnInit } from '@angular/core';
import { Persona } from '../modelo/persona';
import { PersonaService } from '../service/persona.service';
import { Router } from '@angular/router'
import { Usuario } from '../modelo/usuario';
import { UsuarioService } from '../service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private personaService: PersonaService, private usuarioService: UsuarioService, private router: Router) { }
  ngOnInit(): void {
  }

  persona: Persona = new Persona();
  usuario: Usuario = new Usuario();
  confirmarPass = "";

  public createusuario(): void {
    if (this.usuario.usuContrasena == this.confirmarPass) {
      this.personaService.crearPersona(this.persona).subscribe(
        response => this.usuarioService.crearUsuario(this.usuario).subscribe(
          response => {
            this.router.navigate(['/login'])
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: `Registro exito`,
              showConfirmButton: false,
              timer: 1500
            })

          }
        )
      )
      console.log("La confirmación de contraseña es válida.");
    } else {
      console.log("La confirmación de contraseña es inválida.");
    }

  }

}
