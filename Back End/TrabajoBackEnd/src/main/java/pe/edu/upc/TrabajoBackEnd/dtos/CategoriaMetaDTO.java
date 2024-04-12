package pe.edu.upc.TrabajoBackEnd.dtos;
public class CategoriaMetaDTO {
    private  int idCategoriaMeta;
    private String nombre;
    public CategoriaMetaDTO() { super(); }
    public CategoriaMetaDTO(int idCategoriaMeta, String nombre) {
        this.idCategoriaMeta = idCategoriaMeta;
        this.nombre = nombre;
    }
    public int getIdCategoriaMeta() {
        return idCategoriaMeta;
    }
    public void setIdCategoriaMeta(int idCategoriaMeta) {
        this.idCategoriaMeta = idCategoriaMeta;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
