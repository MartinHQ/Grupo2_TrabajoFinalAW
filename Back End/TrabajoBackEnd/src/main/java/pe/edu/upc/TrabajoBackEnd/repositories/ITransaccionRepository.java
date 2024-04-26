package pe.edu.upc.TrabajoBackEnd.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.TrabajoBackEnd.entities.Transaccion;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ITransaccionRepository extends JpaRepository<Transaccion, Integer> {

    @Query(value = "SELECT ct.nombre, MAX(t.monto_transaccion) \n" +
            "FROM Transaccion t \n" +
            "JOIN categoria_tranx ct ON t.categoria_id = ct.id_categoriatranx \n" +
            "JOIN usuario u ON u.usuario_id = t.usuario_id \n" +
            "WHERE t.es_ingreso_transaccion = :es_ingreso \n" +
            "AND t.usuario_id = :id_usuario \n" +
            "AND t.fecha_transaccion BETWEEN :date1 AND :date2 \n" +
            "GROUP BY ct.nombre", nativeQuery = true)
    public List<String[]> maxMontoByCategoria(LocalDate date1, LocalDate date2, int id_usuario,
                                              Boolean es_ingreso);

}