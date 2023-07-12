import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelo/usuario';
import { AllScriptsService } from '../scripts/all-scripts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private AllScripts: AllScriptsService) {
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


}
