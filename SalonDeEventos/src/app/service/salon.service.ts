import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Salon } from '../modelo/salon';

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

}
