package pe.edu.upc.TrabajoBackEnd.dtos;

public class CantMetaAhorroSiNoCumplidaDTO {
 private String estado_meta;
 private int cantidad;
 
    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
   

    public String getEstado_Meta(){
        return estado_meta;
    }

    public void setEstado_Meta(String estado_meta){
      this.estado_meta=estado_meta;
    }
}
