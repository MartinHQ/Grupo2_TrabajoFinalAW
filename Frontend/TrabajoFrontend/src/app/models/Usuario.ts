import { Rol } from "./Rol";

export class Usuario{
    usuario_id: number = 0;
    nombre: string = '';
    apellido: string = '';
    edad: number = 0;
    correo: string = '';
    contrasenia: string = '';
    fecha_registro: Date = new Date();
    ahorro_acumulado: number = 0;
    rol_id: Rol = new Rol();
}