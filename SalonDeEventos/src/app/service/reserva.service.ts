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


    crearReserva(res: Reserva): Observable<Reserva> {
        return this.http.post<Reserva>(`${this.url}/crear`, res, { headers: this.httpHeaders })
    }


    buscarId(id: number): Observable<Reserva> {
        return this.http.get<Reserva>(`${this.url}/buscar/${id}`);
    }

    fechaOcupada(dia: number, mes: number, anio: number): Observable<boolean> {
        return this.http.get<boolean>(`${this.url}/fechaOcupada/${dia}/${mes}/${anio}`);
    }

    listarEst(est: number): Observable<Reserva[]> {
        return this.http.get(`${this.url}/listarEst/${est}`).pipe(map(response => response as Reserva[]));
    }

    misReservas(id: number, est: number): Observable<Reserva[]> {
        return this.http.get(`${this.url}/misReservas/${id}/${est}`).pipe(map(response => response as Reserva[]));
    }


    validarReserva(id: number, estado: number, res: Reserva): Observable<Reserva> {
        return this.http.put<Reserva>(`${this.url}/validarReserva/${id}/${estado}`, res);
    }

    numReserva():Observable<number>{
        return this.http.get<number>(`${this.url}/numReserva`);
    }
}
