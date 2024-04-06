package pe.edu.upc.TrabajoBackEnd.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Roll")
public class Roll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRoll;

    @Column(name="nombre",length = 250,nullable = false)
    private String nombre;

}
