package pe.edu.upc.TrabajoBackEnd.dtos;

import lombok.Data;
import pe.edu.upc.TrabajoBackEnd.entities.Rol;
import java.time.LocalDate;
@Data
public class UsuarioDTO {
    private int usuario_id;
    private String nombre;
    private String apellido;
    private int edad;
    private String correo;
    private String contrasenia;
    private LocalDate fecha_registro;
    private float ahorro_acumulado;
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
}
