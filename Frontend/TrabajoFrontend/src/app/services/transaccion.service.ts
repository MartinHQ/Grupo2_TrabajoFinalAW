import { Injectable } from '@angular/core';
import { Transaccion } from '../models/Transaccion';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { promedioingresoegresopormesDTO } from '../models/PromedioingresoegresopormesDTO';
import { MaxMontoByCategoriaDTO } from '../models/maxMontoByCategoriaDTO';
import { promedioTransaccionDTO } from '../models/promedioTransaccionDTO';
import { formatDate } from '@angular/common';
import { CategoriasPopularesDTO } from '../models/CategoriasPopularesDTO';
import { SaldosPorUsuarioDTO } from '../models/SaldosPorUsuarioDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class TransaccionService {
  private url = `${base_url}/transacciones`;
  private listaCambio = new Subject<Transaccion[]>();

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Transaccion[]>(this.url);
  }

  registrar(ct: Transaccion) {
    return this.http.post(this.url, ct);
  }

  getListaCambio() {
    return this.listaCambio.asObservable();
  }

  setListaCambio(listanueva: Transaccion[]) {
    this.listaCambio.next(listanueva);
  }

  listId(id: number) {
    return this.http.get<Transaccion>(`${this.url}/${id}`);
  }

  update(ct: Transaccion) {
    return this.http.put(this.url, ct);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listarPorUsuarioOrdenadas(usuarioId: number): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(`${this.url}/usuario/${usuarioId}`);
  }

  getIngresosEgresosPorMes(
    usuarioId: number
  ): Observable<promedioingresoegresopormesDTO[]> {
    return this.http.get<promedioingresoegresopormesDTO[]>(
      `${this.url}/ingresosEgresosPorMes/${usuarioId}`
    );
  }
  getMaxMontoByCategoria(
    fechaInicio: Date,
    fechaFin: Date,
    idUsuario: number,
    esIngreso: boolean
  ): Observable<MaxMontoByCategoriaDTO[]> {
    // Formatear las fechas a 'yyyy-MM-dd'
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    let params = new HttpParams()
      .set('date1', formatDate(fechaInicio))
      .set('date2', formatDate(fechaFin))
      .set('id_usuario', idUsuario.toString())
      .set('es_ingreso', esIngreso.toString());

    return this.http.get<MaxMontoByCategoriaDTO[]>(
      `${this.url}/max-categoria`,
      { params }
    );
  }

  getAhorroAcumulado(usuarioId: number): Observable<number> {
    return this.http.get<number>(`${this.url}/ahorroAcumulado/${usuarioId}`);
  }

  getPromedioTransaccion(fechainicio:Date,fechafin:Date):Observable<promedioTransaccionDTO[]>{

    //const formatofecha=(date:Date)=> date.toISOString().split('T')[0];
     // Convertir las fechas a 'YYYY-MM-DD'
     const fechaInicioFormatted = fechainicio.toISOString().split('T')[0];
     const fechaFinFormatted = fechafin.toISOString().split('T')[0];

     // Configurar los parámetros para la solicitud HTTP
     const params = new HttpParams()
       .set('date1', fechaInicioFormatted)
       .set('date2', fechaFinFormatted);

    return this.http.get<promedioTransaccionDTO[]>(`${this.url}/promediotransaccion`,{params});
  }
  getCategoriasPopulares():Observable<CategoriasPopularesDTO[]>{
    return this.http.get<CategoriasPopularesDTO[]>(`${this.url}/categoriaspopulares`);
  }

  //mario query
  getTopSaldoPorTiempo(fechaInicio: Date, fechaFin: Date): Observable<SaldosPorUsuarioDTO[]> {
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    let params = new HttpParams()
      .set('fechainicio', formatDate(fechaInicio))
      .set('fechafin', formatDate(fechaFin));

    return this.http.get<SaldosPorUsuarioDTO[]>(`${this.url}/reportesaldos`,{params});
   }
}
