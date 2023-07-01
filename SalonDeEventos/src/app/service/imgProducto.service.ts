import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ImgProducto } from '../modelo/imgProducto';

@Injectable({
  providedIn: 'root'
})
export class ImgProductoService {

  private url: string = 'http://localhost:9999/imgproductos'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  agregarIMG(persona: ImgProducto): Observable<ImgProducto> {
    return this.http.post<ImgProducto>(`${this.url}/crear`, persona, { headers: this.httpHeaders })
  }
}