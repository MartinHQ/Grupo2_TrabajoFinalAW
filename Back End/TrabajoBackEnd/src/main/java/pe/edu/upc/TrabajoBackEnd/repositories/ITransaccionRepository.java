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

    @Query(value = "SELECT AVG(monto) FROM Transaccion WHERE usuario_id = :usuarioId \n" +
            "AND fecha BETWEEN :fechaInicio AND :fechaFin AND es_ingreso = TRUE", nativeQuery = true)
    Double encontrarPromedioIngresosPorUsuarioYRangoFechas(@Param("usuarioId") int usuarioId, @Param("fechaInicio") LocalDate fechaInicio, @Param("fechaFin") LocalDate fechaFin);

    @Query(value = "SELECT * FROM Transaccion WHERE usuario_id = :usuarioId ORDER BY fecha ASC", nativeQuery = true)
    List<Transaccion> encontrarTodasPorUsuarioIdOrdenadoPorFechaAsc(@Param("usuarioId") int usuarioId);

}