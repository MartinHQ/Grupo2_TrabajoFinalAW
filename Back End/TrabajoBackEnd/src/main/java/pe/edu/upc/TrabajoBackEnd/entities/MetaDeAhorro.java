package pe.edu.upc.TrabajoBackEnd.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "MetaDeAhorro")
public class MetaDeAhorro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int metadeahorro;
    @Column(name = "titulo_meta", length = 50, nullable = false)
    private String titulo_meta;
    @Column(name = "descripcion", length = 50, nullable = false)
    private String descripcion;
    @Column(name = "monto_objetivo", nullable = false)
    private int monto_objetivo;
    @Column(name = "fecha_limite", nullable = false)
    private LocalDate fecha_limite;
    @Column(name = "meta_cumplida", nullable = false)
    private boolean meta_cumplida;
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario_id;
    @ManyToOne
    @JoinColumn(name = "categoria_meta_id")
    private TipoMeta tipo_meta_id;

}
