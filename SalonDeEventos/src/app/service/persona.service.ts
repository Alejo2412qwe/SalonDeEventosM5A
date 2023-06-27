import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Persona } from '../modelo/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private url: string = 'http://localhost:9999/persona'

  private httpHeaders = new HttpHeaders({ 'Content- Type': 'application / json' })


  constructor(private http: HttpClient) {}

  crearPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.url + "/crear", persona, { headers: this.httpHeaders })
  }

}
