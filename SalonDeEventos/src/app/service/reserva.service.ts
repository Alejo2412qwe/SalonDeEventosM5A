import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Reserva } from "../modelo/reserva";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ReservaService {

    private url: string = 'http://localhost:9999/reserva'

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

    constructor(private http: HttpClient) { }


    getReserva(): Observable<Reserva[]> {
        return this.http.get(this.url + "/listar").pipe(map(response => response as Reserva[]));
    }
}
