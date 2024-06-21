package pe.edu.upc.TrabajoBackEnd.dtos;

public class CantMetaAhorroSiNoCumplidaDTO {
 private String nombre;
 private int  meta_cumplida;
 private int meta_no_cumplida;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getMeta_cumplida() {
        return meta_cumplida;
    }

    public void setMeta_cumplida(int meta_cumplida) {
        this.meta_cumplida = meta_cumplida;
    }
   
    public int getMeta_no_cumplida(){
        return meta_no_cumplida;
    }

    public void setMeta_no_cumplida(int meta_no_cumplidas){
        this.meta_no_cumplida=meta_no_cumplidas;
    }

}
