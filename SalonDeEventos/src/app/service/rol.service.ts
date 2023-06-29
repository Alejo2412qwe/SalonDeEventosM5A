import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Rol } from '../modelo/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url: string = 'http://localhost:9999/rol'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getRol(id:number):Observable<Rol>{
    return this.http.get<Rol>(`${this.url}/rolId/${id}`);
  }
}
