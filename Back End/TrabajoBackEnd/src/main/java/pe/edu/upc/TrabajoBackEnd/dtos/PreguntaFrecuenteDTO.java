package pe.edu.upc.TrabajoBackEnd.dtos;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class PreguntaFrecuenteDTO {
    private int idPreguntaFrecuente;
    private String preguntaPreguntaFrecuente;
    private String respuestaAsociadaPreguntaFrecuente;
}
