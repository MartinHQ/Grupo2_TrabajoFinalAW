import { Usuario } from './Usuario';

export class CuentaBancaria {
  cuentabancaria_id: number = 0;
  nombre_banco: string = '';
  numero_cuenta: number = 0;
  tipo: boolean = false;
  usuario_id: Usuario = new Usuario();
}
