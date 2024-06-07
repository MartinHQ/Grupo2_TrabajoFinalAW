import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Rol } from '../models/Rol';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url = `${base_url}/roles`;
  private listado = new Subject<Rol[]>();
  constructor(private http: HttpClient) { }
  listar() {
    return this.http.get<Rol[]>(this.url);
  }


  getListaCambio() {
    return this.listado.asObservable();
  }
}
