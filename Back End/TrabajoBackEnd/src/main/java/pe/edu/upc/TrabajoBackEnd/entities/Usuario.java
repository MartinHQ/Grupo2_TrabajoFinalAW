package pe.edu.upc.TrabajoBackEnd.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Usuario")
public class Usuario implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int usuario_id;
    @Column(name = "nombre", length = 50, nullable = false)
    private String nombre;
    @Column(name = "apellido", length = 50, nullable = false)
    private String apellido;
    @Column(name = "edad", nullable = false)
    private int edad;
    @Column(name = "correo", length = 50, nullable = false, unique = true)
    private String correo;
    @Column(name = "contrasenia", length = 100, nullable = false)
    private String contrasenia;
    @Column(name = "fecha_registro", length = 50, nullable = false)
    private LocalDate fecha_registro;
    @Column(name = "ahorro_acumulado", nullable = false)
    private float ahorro_acumulado;
    @ManyToOne
    @JoinColumn(name = "rol_id")
    private Rol rol_id;
    public Usuario(int usuario_id, Rol rol_id, String nombre, String apellido, int edad, String correo, String contrasenia, LocalDate fecha_registro) {
        this.usuario_id = usuario_id;
        this.rol_id = rol_id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.correo = correo;
        this.contrasenia = contrasenia;
        this.fecha_registro = fecha_registro;
    }
}
