package pe.edu.upc.TrabajoBackEnd.dtos;
import lombok.Data;

@Data
public class promedioegresosporcategoriaDTO {
    private String categoria;
    private int mes;
    private float total_egresos;
    private float promedio_egresos;
}
