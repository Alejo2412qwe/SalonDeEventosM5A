import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Reserva } from "../modelo/reserva";
import { Observable, map } from "rxjs";
import { Cotizacion } from "../modelo/cotizacion";

@Injectable({
    providedIn: 'root'
})
export class CotizacionService {

    private url: string = 'http://localhost:9999/cotizacion'

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

    constructor(private http: HttpClient) { }


    getCotizacion(): Observable<Cotizacion[]> {
        return this.http.get(this.url + "/listar").pipe(map(response => response as Cotizacion[]));
    }
}
