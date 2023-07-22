import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImagenService {

    private url: string = 'http://localhost:9999/imagen'

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

    constructor(private http: HttpClient) { }

    obtenerImagenPorId(id: number): Observable<HttpResponse<any>> {
        const url = `${this.url}/obtener-archivo/${id}`;
        return this.http.get(url, { responseType: 'arraybuffer', observe: 'response' });
    }
}
