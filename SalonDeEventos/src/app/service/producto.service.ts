import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ProductoServicio } from '../modelo/producto-servicio';

@Injectable({
    providedIn: 'root'
})
export class productoService {

    private url: string = 'http://localhost:9999/productoServicio'

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })


    constructor(private http: HttpClient) { }

    crearProducto(productoServicio: ProductoServicio): Observable<ProductoServicio> {
        return this.http.post<ProductoServicio>(this.url + "/crear", productoServicio, { headers: this.httpHeaders })
    }

}