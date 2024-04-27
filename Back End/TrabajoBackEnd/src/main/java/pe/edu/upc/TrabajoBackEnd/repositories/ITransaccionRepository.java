package pe.edu.upc.TrabajoBackEnd.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.TrabajoBackEnd.entities.Transaccion;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ITransaccionRepository extends JpaRepository<Transaccion, Integer> {
    @Query(value = "SELECT t.usuario_id, CONCAT(u.nombre, ' ', u.apellido) AS Nombre,\n" +
            "SUM(CASE WHEN t.es_ingreso_transaccion THEN t.monto_transaccion ELSE -t.monto_transaccion END) AS saldo_total\n" +
            "FROM transaccion t INNER JOIN usuario u ON t.usuario_id = u.usuario_id \n" +
            "WHERE t.fecha_transaccion BETWEEN :fechainicio AND :fechafin\n" +
            "GROUP BY t.usuario_id, u.nombre, u.apellido", nativeQuery = true)
    public List<String[]> reporteSaldosporrangoTiempo(@Param("fechainicio") LocalDate fechainicio,@Param("fechafin") LocalDate fechafin);
}