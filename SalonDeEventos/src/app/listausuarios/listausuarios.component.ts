import { Component, OnInit } from '@angular/core';
import { Persona } from '../modelo/persona';
import { PersonaService } from '../service/persona.service';
import { ActivatedRoute, Router } from '@angular/router'
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../modelo/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.css']
})
export class ListausuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private PersonaService: PersonaService, private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.listaUsuarios();
  }

  listaUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      user => this.usuarios = user
    );
  }

  eliminar(id: number): void {
    Swal.fire({
      title: `¿Seguro que desea eliminar el usuario?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(id).subscribe(user => {
          this.usuarioService.getUsuarios().subscribe(users => this.usuarios = users)

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Cliente eliminado exitosamente`,
            showConfirmButton: true,
            timer: 1500
          })
        })
        Swal.fire('Saved!', '', 'success')

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }


}
