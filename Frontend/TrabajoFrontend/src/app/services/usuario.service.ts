import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url =`${base_url}/usuarios`
  private updatedlistConsejos = new Subject<Usuario[]>();

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Usuario[]>(this.url)
  }

  insert(u: Usuario){
    return this.http.post(`${this.url}/registrar-usuario`, u)
  }
  setList(newlist: Usuario[]){
    this.updatedlistConsejos.next(newlist)
  }

  getList(){
    return this.updatedlistConsejos.asObservable()
  }

  listId(id: number){
    return this.http.get<Usuario>(`${this.url}/${id}`)
  }
  update(u: Usuario){
    return this.http.put<Usuario>(this.url, u)
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`)
  }

  findbyCorreo(correo:string){
    return this.http.get<Usuario>(`${this.url}/correo?correo=${correo}`);
  }
}
