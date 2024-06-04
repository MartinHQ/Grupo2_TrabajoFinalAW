import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { PreguntaFrecuente } from '../models/PreguntaFrecuente';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PreguntafrecuenteService {
  private url = `${base_url}/preguntafrecuente`;
  private listaCambio = new Subject<PreguntaFrecuente[]>();

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<PreguntaFrecuente[]>(this.url);
  }

  registrar(pf: PreguntaFrecuente) {
    return this.http.post(this.url, pf);
  }

  //getter y setter
  getListaCambio(){
    return this.listaCambio.asObservable();
  }

  setListaCambio(listaNueva:PreguntaFrecuente[]){
    this.listaCambio.next(listaNueva);
  }
}
