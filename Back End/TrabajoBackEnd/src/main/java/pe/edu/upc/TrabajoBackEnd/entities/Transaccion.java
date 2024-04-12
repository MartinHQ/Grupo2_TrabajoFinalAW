package pe.edu.upc.TrabajoBackEnd.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Transaccion")
public class Transaccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idTransaccion;
    @Column(name = "montoTransaccion", nullable = false)
    private float montoTransaccion;
    @Column(name = "fechaTransaccion", nullable = false)
    private LocalDate fechaTransaccion;
    @Column(name = "es_ingresoTransaccion", nullable = false)
    private boolean es_ingresoTransaccion;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario_id;

    @ManyToOne
    @JoinColumn(name="categoria_id")
    private Categoriatranx categoria_id;
}
