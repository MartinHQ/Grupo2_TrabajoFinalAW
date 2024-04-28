package pe.edu.upc.TrabajoBackEnd.dtos;

public class CategoriatranxDTO {
    private  int idCategoriatranx;
    private String nombre;
    private String descripcion;
    public CategoriatranxDTO() {
        super();
    }
    public CategoriatranxDTO(int idCategoriatranx, String nombre, String descripcion) {
        this.idCategoriatranx = idCategoriatranx;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
    public int getIdCategoriatranx() {
        return idCategoriatranx;
    }
    public void setIdCategoriatranx(int idCategoriatranx) {
        this.idCategoriatranx = idCategoriatranx;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
