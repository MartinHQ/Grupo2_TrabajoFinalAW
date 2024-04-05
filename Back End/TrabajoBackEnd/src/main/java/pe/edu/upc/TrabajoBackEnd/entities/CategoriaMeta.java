package pe.edu.upc.TrabajoBackEnd.entities;
import jakarta.persistence.*;
@Entity
@Table(name= "CategoriaMeta")
public class CategoriaMeta {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int idCategoriaMeta;
        @Column(name = "nombre", length = 25, nullable = false)
        private String nombre;

        public CategoriaMeta() {
            super();
        }
        public CategoriaMeta(int idCategoriaMeta, String nombre) {
            super();
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
