import { Injectable } from '@angular/core';
import { Transaccion } from '../models/Transaccion';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private url = `${base_url}/transacciones`;
  private listaCambio = new Subject<Transaccion[]>();

  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Transaccion[]>(this.url);
  }


  registrar(ct:Transaccion){
    return this.http.post(this.url, ct)
  }

  getListaCambio(){
    return this.listaCambio.asObservable();
  }

  setListaCambio(listanueva:Transaccion[]){
    this.listaCambio.next(listanueva);
  }

  listId(id:number){
    return this.http.get<Transaccion>(`${this.url}/${id}`)
  }

  update(ct: Transaccion) {
    return this.http.put(this.url, ct);
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  listarPorUsuarioOrdenadas(usuarioId: number): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(`${this.url}/usuario/${usuarioId}`);
  }

  getListaCambioPorUsuario(){
    return this.listaCambio.asObservable();
  }

  setListaCambioPorUsuario(listanueva:Transaccion[]){
    this.listaCambio.next(listanueva);
  }


}
