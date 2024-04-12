package pe.edu.upc.TrabajoBackEnd.dtos;

import jakarta.persistence.*;
import lombok.Data;
import pe.edu.upc.TrabajoBackEnd.entities.Categoriatranx;
import pe.edu.upc.TrabajoBackEnd.entities.Usuario;

import java.time.LocalDate;
@Data
public class TransaccionDTO {
    private int idTransaccion;
    private float montoTransaccion;
    private LocalDate fechaTransaccion;
    private boolean es_ingresoTransaccion;

    private Usuario usuario_id;

    private Categoriatranx categoria_id;
}
