import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllScriptsService } from '../scripts/all-scripts.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Reserva } from '../modelo/reserva';
import { ReservaService } from '../service/reserva.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {

  fechaIni: Date = new Date();
  fechaFin: Date = new Date();
  reporteFechas: Reserva[] = [];


  constructor(private el: ElementRef, private renderer: Renderer2, private activatedRoute: ActivatedRoute, private AllScripts: AllScriptsService,
    private sanitizer: DomSanitizer, private reservaService: ReservaService) {
    AllScripts.Cargar(["default/ventana"])


  }
  fechaInicioFormateada(): string {
    const fecha: Date = new Date(this.fechaIni)
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString();
    return `${anio}-${mes}-${dia}`;
  }

  fechaFinFormateada(): string {
    const fecha: Date = new Date(this.fechaFin)
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString();
    return `${anio}-${mes}-${dia}`;
  }

  obtenerReporteFecha(): void {
    console.log(this.fechaInicioFormateada() + " === " + this.fechaFinFormateada())
    this.reservaService.reporteFechas(this.fechaInicioFormateada(), this.fechaFinFormateada()).subscribe(res => {
      this.reporteFechas = res;
    })
  }

  mostrarVentanaLogin2(): void {
    const userString = localStorage.getItem('userData');

    if (userString !== null) {
      const ventanaFlotante = this.el.nativeElement.querySelector('.ventana-flotante2');
      this.renderer.setStyle(ventanaFlotante, 'display', 'flex');
    } else {

    }

  }
  mostrarVentanaLogin3(): void {
    const userString = localStorage.getItem('userData');

    if (userString !== null) {
      const ventanaFlotante = this.el.nativeElement.querySelector('.ventana-flotante3');
      this.renderer.setStyle(ventanaFlotante, 'display', 'flex');
    } else {

    }

  }

  mostrarVentanaLogin4(): void {
    const userString = localStorage.getItem('userData');

    if (userString !== null) {
      const ventanaFlotante = this.el.nativeElement.querySelector('.ventana-flotante4');
      this.renderer.setStyle(ventanaFlotante, 'display', 'flex');
    } else {

    }

  }

}
