import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelo/usuario';
import { AllScriptsService } from '../scripts/all-scripts.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private AllScripts: AllScriptsService, private sanitizer: DomSanitizer) {
    AllScripts.Cargar(["default/ventana"]);
  }
  user: Usuario = new Usuario();
  ngOnInit(): void {
    const userString = localStorage.getItem('userData');

    if (userString !== null) {
      this.user = JSON.parse(userString);
    } else {
      console.error('No hay datos de usuario en el Local Storage');
    }
  }

  getMapUrl(latitud: number, longitud: number): SafeResourceUrl {
    const mapUrl = `https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3984.7770135720775!2d${longitud}!3d${latitud}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMsKwNTInNTAuMSJTIDc5wrAwMCc0MS42Ilc!5e0!3m2!1ses!2sec!4v1687016743604!5m2!1ses!2sec`;

    // Sanitizar la URL para evitar problemas de seguridad
    return this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
  }


}
