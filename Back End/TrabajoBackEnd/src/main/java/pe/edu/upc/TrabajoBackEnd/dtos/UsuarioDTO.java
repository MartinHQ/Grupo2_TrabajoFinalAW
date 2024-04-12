package pe.edu.upc.TrabajoBackEnd.dtos;
import pe.edu.upc.TrabajoBackEnd.entities.Rol;
import java.time.LocalDate;
public class UsuarioDTO {
    private int usuario_id;
    private String nombre;
    private String apellido;
    private int edad;
    private String correo;
    private String contrasenia;
    private LocalDate fecha_registro;
    private Rol rol_id;
    public UsuarioDTO() { super(); }
    public UsuarioDTO(int usuario_id, Rol rol_id, String nombre, String apellido, int edad, String correo, String contrasenia, LocalDate fecha_registro) {
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
