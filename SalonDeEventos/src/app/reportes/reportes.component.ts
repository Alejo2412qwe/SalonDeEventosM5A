import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllScriptsService } from '../scripts/all-scripts.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  constructor(private el: ElementRef, private renderer: Renderer2, private activatedRoute: ActivatedRoute, private AllScripts: AllScriptsService, private sanitizer: DomSanitizer) {
    AllScripts.Cargar(["default/ventana"]);

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
