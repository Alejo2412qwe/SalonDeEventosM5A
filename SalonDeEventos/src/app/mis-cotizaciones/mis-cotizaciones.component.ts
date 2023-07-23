import { Component } from '@angular/core';
import { Cotizacion } from '../modelo/cotizacion';
import { CotizacionService } from '../service/cotizacion.service';
import { Salon } from '../modelo/salon';
import { Usuario } from '../modelo/usuario';

@Component({
  selector: 'app-mis-cotizaciones',
  templateUrl: './mis-cotizaciones.component.html',
  styleUrls: ['./mis-cotizaciones.component.css']
})
export class MisCotizacionesComponent {
  cotizaciones: Cotizacion[] = [];
  salones: Salon[] = [];
  constructor(private cotizacionService: CotizacionService) { }

  ngOnInit(): void {
    this.listarCotizaciones();
  }
  listarCotizaciones(): void {
    this.cotizacionService.getCotizacion().subscribe(
      (cotizacion: Cotizacion[]) => {
        this.cotizaciones = cotizacion;
      }
    );
  }
  getSalonName(salon: Salon): string {
    return salon ? salon.salNombre : '';
  }
  getUsuarioName(usuario: Usuario): string {
    return usuario ? usuario.usuNombreUsuario : '';
  }

}
