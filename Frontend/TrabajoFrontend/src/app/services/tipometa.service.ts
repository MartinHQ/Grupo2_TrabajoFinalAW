import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TipoMeta } from '../models/TipoMeta';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class TipometaService {
  private url = `${base_url}/tipometa`;
  private listaCambio = new Subject<TipoMeta[]>();

  constructor(private http: HttpClient) { }
  listar() {
    return this.http.get<TipoMeta[]>(this.url);
  }

  registrar(tm: TipoMeta) {
    return this.http.post(this.url, tm);
  }
  getListaCambio() {
    return this.listaCambio.asObservable();
  }

  setListaCambio(listanueva:TipoMeta[]){
    this.listaCambio.next(listanueva);
  }

  listId(id:number){
    return this.http.get<TipoMeta>(`${this.url}/${id}`)
  }

  modificar(tm: TipoMeta) {
    return this.http.put(this.url, tm);
  }
  
  eliminar(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
