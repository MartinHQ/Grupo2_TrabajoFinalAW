package pe.edu.upc.TrabajoBackEnd.dtos;
import lombok.Data;

@Data
public class promedioingresoegresopormesDTO {
    private String mes;
    private float promedio_egresos;
    private float promedio_ingresos;
}
