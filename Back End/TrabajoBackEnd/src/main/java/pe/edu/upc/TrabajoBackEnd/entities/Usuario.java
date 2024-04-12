package pe.edu.upc.TrabajoBackEnd.entities;
import jakarta.persistence.*;
import java.time.LocalDate;
@Entity
@Table(name = "Usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int usuario_id;
    @Column(name = "nombre", length = 50, nullable = false)
    private String nombre;
    @Column(name = "apellido", length = 50, nullable = false)
    private String apellido;
    @Column(name = "edad", nullable = false)
    private int edad;
    @Column(name = "correo", length = 50, nullable = false)
    private String correo;
    @Column(name = "contrasenia", length = 50, nullable = false)
    private String contrasenia;
    @Column(name = "fecha_registro", length = 50, nullable = false)
    private LocalDate fecha_registro;
    @ManyToOne
    @JoinColumn(name = "rol_id")
    private Rol rol_id;
    public Usuario() { super(); }
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
    public int getUsuario_id() { return usuario_id; }
    public void setUsuario_id(int usuario_id) { this.usuario_id = usuario_id; }
    public Rol getRol_id() { return rol_id; }
    public void setRol_id(Rol rol_id) { this.rol_id = rol_id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }
    public int getEdad() { return edad; }
    public void setEdad(int edad) { this.edad = edad; }
    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }
    public String getContrasenia() { return contrasenia; }
    public void setContrasenia(String contrasenia) { this.contrasenia = contrasenia; }
    public LocalDate getFecha_registro() { return fecha_registro; }
    public void setFecha_registro(LocalDate fecha_registro) { this.fecha_registro = fecha_registro; }
}
