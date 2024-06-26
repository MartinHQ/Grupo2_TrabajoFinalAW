package pe.edu.upc.TrabajoBackEnd.dtos;
public class ConsejoDTO {
    private int idConsejo;
    private String titulo;
    private String descripcion;

    public ConsejoDTO(int idConsejo, String titulo, String descripcion) {
        this.idConsejo = idConsejo;
        this.titulo = titulo;
        this.descripcion = descripcion;
    }

    public ConsejoDTO() {
        super();
    }

    public int getIdConsejo() {return idConsejo;}

    public void setIdConsejo(int idConsejo) {this.idConsejo = idConsejo;}

    public String getTitulo() {return titulo;}

    public void setTitulo(String titulo) {this.titulo = titulo;}

    public String getDescripcion() {return descripcion;}

    public void setDescripcion(String descripcion) {this.descripcion = descripcion;}
}
