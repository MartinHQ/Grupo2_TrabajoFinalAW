import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MetaDeAhorro } from '../models/MetaDeAhorro';
import { Observable, Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class MetadeahorroService {
  private url = `${base_url}/metadeahorro`;
  private listacambio = new Subject<MetaDeAhorro[]>();
  constructor(private http: HttpClient) {}
  listar() {
    return this.http.get<MetaDeAhorro[]>(this.url);
  }

  registrar(mt: MetaDeAhorro) {
    return this.http.post(this.url, mt);
  }

  getListaCambio() {
    return this.listacambio.asObservable();
  }

  setListaCambio(listanueva: MetaDeAhorro[]) {
    this.listacambio.next(listanueva);
  }

  listarId(id: number) {
    return this.http.get<MetaDeAhorro>(`${this.url}/${id}`);
  }

  modificar(mt: MetaDeAhorro) {
    return this.http.put(this.url, mt);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  //para listar solo los datos del usuario que se acaba de iniciar sesion 
  listarporusuarioactivo(usuario_id:number):Observable<MetaDeAhorro[]>{
    return this.http.get<MetaDeAhorro[]>(`${this.url}/usuarioactivo/${usuario_id}`);
  }
}
