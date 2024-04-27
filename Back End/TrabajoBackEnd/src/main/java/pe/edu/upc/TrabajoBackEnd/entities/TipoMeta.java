package pe.edu.upc.TrabajoBackEnd.entities;
import jakarta.persistence.*;
@Entity
@Table(name= "TipoMeta")
public class TipoMeta {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int idTipoMeta;
        @Column(name = "nombre", length = 25, nullable = false)
        private String nombre;

        public TipoMeta() {
            super();
        }
        public TipoMeta(int idTipoMeta, String nombre) {
            super();
            this.idTipoMeta = idTipoMeta;
            this.nombre = nombre;
        }

    public int getIdTipoMeta() {
        return idTipoMeta;
    }

    public void setIdTipoMeta(int idTipoMeta) {
        this.idTipoMeta = idTipoMeta;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
