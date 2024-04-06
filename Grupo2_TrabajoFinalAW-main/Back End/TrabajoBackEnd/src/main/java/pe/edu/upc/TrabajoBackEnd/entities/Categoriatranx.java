package pe.edu.upc.TrabajoBackEnd.entities;
import jakarta.persistence.*;
@Entity
@Table(name= "Categoriatranx")
public class Categoriatranx {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCategoriatranx;
    @Column(name = "nombre", length = 30, nullable = false)
    private String nombre;
    @Column(name = "descripcion", length = 250, nullable = false)
    private String descripcion;

    public Categoriatranx() {
        super();
    }
    public Categoriatranx(int idCategoriatranx, String nombre, String descripcion) {
        super();
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
