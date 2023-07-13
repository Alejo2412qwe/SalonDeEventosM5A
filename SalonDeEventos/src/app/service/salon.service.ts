import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Salon } from '../modelo/salon';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SalonService {

    private url: string = 'http://localhost:9999/salon'

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

    constructor(private http: HttpClient) { }

    crearSalon(salon: Salon): Observable<Salon> {
        return this.http.post<Salon>(this.url + "/crear", salon, { headers: this.httpHeaders })
    }

    buscarSal(busqueda: string): Observable<SalonService[]> {
        return this.http.get(`${this.url}/busqueda/${busqueda}`).pipe(map(response => response as SalonService[]));
    }

    listarEst(est: number): Observable<SalonService[]> {
        return this.http.get(`${this.url}/listar/${est}`).pipe(map(response => response as SalonService[]));
    }

    getSalon(): Observable<Salon[]> {
        return this.http.get(this.url + "/listar").pipe(map(response => response as Salon[]));
    }

    getSalonId(id: number): Observable<Salon> {
        return this.http.get<Salon>(`${this.url}/salonporid/${id}`);
    }

    delete(id: number): Observable<Salon> {
        return this.http.put<Salon>(`${this.url}/eliminarE/${id}`, null);
    }

    update(id: number, salon: Salon): Observable<Salon> {
        return this.http.put<Salon>(`${this.url}/actualizar/${id}`, salon);
    }
}
