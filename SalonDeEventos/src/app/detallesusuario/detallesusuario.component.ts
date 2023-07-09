import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { PersonaService } from '../service/persona.service';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../modelo/usuario';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Persona } from '../modelo/persona';
import { Rol } from '../modelo/rol';
import { RolService } from '../service/rol.service';


@Component({
  selector: 'app-detallesusuario',
  templateUrl: './detallesusuario.component.html',
  styleUrls: ['./detallesusuario.component.css']
})
export class DetallesusuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  persona: Persona = new Persona();
  rol: Rol = new Rol();
  roles: Rol[] = [];
  rolSelect: Rol = new Rol;



  constructor(private personaService: PersonaService, private usuarioService: UsuarioService, private rolService: RolService,
    private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.cargarUsu();
    this.cargarRoles();
  }
  cargarRoles(): void {

    // let rolSELEC: Rol = new Rol()
    // rolSELEC.rolId = 0;
    // rolSELEC.rolNombre = 'Seleccione un rol';
    // this.roles.push(rolSELEC);
    this.rolService.getRoles().subscribe(
      rolesArray => {
        for (let rol of rolesArray) {
          this.roles.push(rol)
        }
      }
    );
  }

  cargarRolUsu(): void {
    this.rol.rolNombre = this.rolSelect.rolNombre;

    for (const rol of this.roles) {
      if (this.rol.rolNombre === rol.rolNombre) {
        this.usuario.rolId = rol;
        break;
      }
    }
  }

  cargarUsu(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.usuarioService.buscarUsu(id).subscribe((usu) => {
          this.usuario = usu
          this.persona = usu.usuPerId
          this.rolSelect = usu.rolId
          console.log("rol= " + this.rolSelect.rolNombre)
        })
      }
    })
  }

  formatDate(date: Date): string {
    // Formatea la fecha como 'yyyy-MM-dd' para que coincida con el formato del campo de entrada
    // console.log(date)
    const nacimiento: Date = new Date(date);
    const year = nacimiento.getFullYear();
    const month = ('0' + (nacimiento.getMonth() + 1)).slice(-2);
    const day = ('0' + nacimiento.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  updateDate(event: any): void {
    // Convierte la cadena de fecha del campo de entrada en un objeto Date
    this.usuario.usuPerId.perFechaNacimiento = new Date(event.target.value);
  }


  update(): void {
    // if (this.validacionesRegistro()) {
    console.log("usu=- " + this.usuario.usuId)
    console.log("per=- " + this.persona.perId)
    Swal.fire({
      title: `¿Esta seguro de modificar sus datos?`,
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
        this.personaService.update(this.persona.perId, this.persona).subscribe(
          response => {
            this.persona.perId = response.perId;
            this.usuario.usuPerId = this.persona;

            this.cargarRolUsu()

            console.log("usuROL= " + this.usuario.rolId.rolNombre)

            this.usuarioService.update(this.usuario.usuId, this.usuario).subscribe(response => {

              console.log(response)

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Sus datos se actualizaron correctamente',
                showConfirmButton: true
                // timer: 3500
              }).then(() => {
                this.router.navigate(["listausu"]);
              });
            });

          }
        )

      } else if (result.isDenied) {
        Swal.fire('Verifique sus datos antes de cambiarlos', '', 'info')
      }
    })


    // }
  }

}
