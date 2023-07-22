import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Adicionales } from '../modelo/adicionales';

@Injectable({
  providedIn: 'root'
})
export class AdicionalesService {

  private url: string = 'http://localhost:9999/adicionales'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  crearAdicional(adicionales: Adicionales): Observable<Adicionales> {
    return this.http.post<Adicionales>(this.url + "/crear", adicionales, { headers: this.httpHeaders })
  }
}
