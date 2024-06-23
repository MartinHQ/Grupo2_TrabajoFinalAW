import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Consejo } from '../models/Consejo';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ConsejoService {
  private url = `${base_url}/consejos`;
  private updatedlistConsejos = new Subject<Consejo[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Consejo[]>(this.url);
  }
  insert(c: Consejo) {
    return this.http.post(this.url, c);
  }
  setList(newlist: Consejo[]) {
    this.updatedlistConsejos.next(newlist);
  }
  getList() {
    return this.updatedlistConsejos.asObservable();
  }
  listId(id: number) {
    return this.http.get<Consejo>(`${this.url}/${id}`);
  }
  update(c: Consejo) {
    return this.http.put(this.url, c);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  buscarKeyword(keyword: string){
    return this.http.get<Consejo[]>(`${this.url}/buscarstring?keyword=${keyword}`)
  }

  listConsejosByCategoria(
    fechaInicio: Date,
    fechaFin: Date,
    idUsuario: number
  ): Observable<Consejo[]> {
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    let params = new HttpParams()
      .set('date1', formatDate(fechaInicio))
      .set('date2', formatDate(fechaFin))
      .set('id_usuario', idUsuario.toString());

    return this.http.get<Consejo[]>(`${this.url}/consejos-por-categoria`,
      { params }
    );
  }
}
