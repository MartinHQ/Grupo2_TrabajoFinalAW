package pe.edu.upc.TrabajoBackEnd.dtos;
import lombok.Data;

@Data
public class contarTranxManualyCtaDTO {

    private String nombre_usuario;
    private String apellido_usuario;
    private int transacciones_manuales;
    private int transacciones_cuenta;
}
