import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { CategoriaTranx } from '../models/CategoriaTranx';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CategoriatranxService {
  private url = `${base_url}/categoriatranx`;
  private listaCambio = new Subject<CategoriaTranx[]>()
  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<CategoriaTranx[]>(this.url);
  }

  registrar(ct:CategoriaTranx){
    return this.http.post(this.url, ct)
  }

  getListaCambio(){
    return this.listaCambio.asObservable();
  }

  setListaCambio(listanueva:CategoriaTranx[]){
    this.listaCambio.next(listanueva);
  }





}
