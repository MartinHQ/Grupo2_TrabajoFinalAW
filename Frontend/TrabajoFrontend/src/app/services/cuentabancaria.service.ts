import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CuentaBancaria } from '../models/CuentaBancaria';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class CuentabancariaService {
  private url = `${base_url}/cuentabancaria`;
  private listaCambio = new Subject<CuentaBancaria[]>();

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<CuentaBancaria[]>(this.url);
  }
  registrar(cb: CuentaBancaria) {
    return this.http.post(this.url, cb);
  }
  modificar(cb: CuentaBancaria) {
    return this.http.put(this.url, cb);
  }
  listarId(id: number) {
    //Revisar el url del listarId del backend
    return this.http.get<CuentaBancaria>(`${this.url}/listarid/${id}`);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  //getter y setter
  getListaCambio() {
    return this.listaCambio.asObservable();
  }

  setListaCambio(listaNueva: CuentaBancaria[]) {
    this.listaCambio.next(listaNueva);
  }
}
