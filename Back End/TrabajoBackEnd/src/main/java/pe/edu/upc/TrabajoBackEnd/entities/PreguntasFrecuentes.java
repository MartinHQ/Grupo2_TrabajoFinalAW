package pe.edu.upc.TrabajoBackEnd.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="PreguntasFrecuentes")
public class PreguntasFrecuentes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPreguntasFrecuentes;

    @Column(name="preguntaPreguntasFrecuentes",length = 250,nullable = false)
    private String preguntaPreguntasFrecuentes;

    @Column(name="respuestaAsociadaPreguntasFrecuentes",length = 250,nullable = false)
    private String respuestaAsociadaPreguntasFrecuentes;
}
