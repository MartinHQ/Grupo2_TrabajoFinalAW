import { TipoMeta } from "./TipoMeta";
import { Usuario } from "./Usuario";

export class MetaDeAhorro{
    metadeahorro:number= 0;
    titulo_meta:string='';
    descripcion:string='';
    monto_objetivo:number=0;
    fecha_limite:Date=new Date();
    meta_cumplida:boolean=false;
    usuario_id:Usuario =new Usuario();
    tipo_meta_id:TipoMeta=new TipoMeta();
}