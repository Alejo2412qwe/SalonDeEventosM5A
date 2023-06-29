import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url: string = 'http://localhost:9999/categoria'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })


  constructor(private http: HttpClient) { }


}