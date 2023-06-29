import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Usuario } from '../modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url: string = 'http://localhost:9999/usuario'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    console.log("USUSERVICE= "+usuario?.usuPerId?.perId);
    return this.http.post<Usuario>(this.url + "/crear", usuario, { headers: this.httpHeaders })
  }

  usuarioExiste(usuario:string):Observable<boolean>{
    return this.http.get<boolean>(`${this.url}/usuarioExiste/${usuario}`);
  }

  login(usuario:string, password:string):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.url}/login/${usuario}/${password}`);
  }
}
