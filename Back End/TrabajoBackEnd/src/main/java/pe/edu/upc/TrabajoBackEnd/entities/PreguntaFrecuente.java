package pe.edu.upc.TrabajoBackEnd.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="PreguntaFrecuente")
public class PreguntaFrecuente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPreguntaFrecuente;

    @Column(name="preguntaPreguntaFrecuente",length = 250,nullable = false)
    private String preguntaPreguntaFrecuente;

    @Column(name="respuestaAsociadaPreguntaFrecuente",length = 250,nullable = false)
    private String respuestaAsociadaPreguntaFrecuente;
}
