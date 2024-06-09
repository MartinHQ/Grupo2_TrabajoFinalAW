import { Usuario } from './Usuario';
import { CategoriaTranx } from './CategoriaTranx';

export class Transaccion {
  idTransaccion: number = 0;
  nombreTransaccion: string = '';
  montoTransaccion: number = 0;
  fechaTransaccion: Date = new Date();
  es_ingresoTransaccion: boolean = false;
  es_manual: boolean = false;
  usuario_id: Usuario = new Usuario();
  categoria_id: CategoriaTranx = new CategoriaTranx();
}
