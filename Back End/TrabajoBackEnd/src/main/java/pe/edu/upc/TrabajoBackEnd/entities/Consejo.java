package pe.edu.upc.TrabajoBackEnd.entities;

import jakarta.persistence.*;

@Entity
@Table(name= "Consejo")
public class Consejo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idConsejo;
    @Column(name = "titulo", length = 25, nullable = false)
    private String titulo;
    @Column(name = "descripcion", length = 250, nullable = false)
    private String descripcion;

    public Consejo() {
        super();
    }
    public Consejo(int idConsejo, String titulo, String descripcion) {
        super();
        this.idConsejo = idConsejo;
        this.titulo = titulo;
        this.descripcion = descripcion;
    }

    public int getIdConsejo() {return idConsejo;}

    public void setIdConsejo(int idConsejo) {this.idConsejo = idConsejo;}

    public String getTitulo() {return titulo;}

    public void setTitulo(String titulo) {this.titulo = titulo;}

    public String getDescripcion() {return descripcion;}

    public void setDescripcion(String descripcion) {this.descripcion = descripcion;}
}
