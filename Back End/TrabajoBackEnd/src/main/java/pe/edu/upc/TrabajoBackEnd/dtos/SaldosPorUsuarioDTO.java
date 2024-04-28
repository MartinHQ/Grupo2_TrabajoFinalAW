package pe.edu.upc.TrabajoBackEnd.dtos;

import lombok.Data;

@Data
public class SaldosPorUsuarioDTO {
    private int idUsuario;
    private String nombreUsuario;
    private float saldoTotal;
}
