import { Component } from '@angular/core';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent {
  cerrarSesion(): void {
    localStorage.removeItem('userData');

    this.obtenerUsuario();
  }

  obtenerUsuario(): void {
    const userString = localStorage.getItem('userData');

    if (userString !== null) {

      alert(JSON.parse(userString))

    } else {
      console.error('No hay datos de usuario en el Local Storage');

    }
  }
}
