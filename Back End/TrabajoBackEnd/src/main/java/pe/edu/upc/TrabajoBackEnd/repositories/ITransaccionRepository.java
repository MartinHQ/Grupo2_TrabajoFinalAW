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
    public List<String[]> maxMontoByCategoria(@Param("date1") LocalDate date1, @Param("date2")LocalDate date2, @Param("id_usuario")int id_usuario,
                                              @Param("es_ingreso")Boolean es_ingreso);

    @Query(value = "SELECT AVG(monto) FROM Transaccion WHERE usuario_id = :usuarioId \n" +
            "AND fecha BETWEEN :fechaInicio AND :fechaFin AND es_ingreso = TRUE", nativeQuery = true)
    Double encontrarPromedioIngresosPorUsuarioYRangoFechas(@Param("usuarioId") int usuarioId, @Param("fechaInicio") LocalDate fechaInicio, @Param("fechaFin") LocalDate fechaFin);

    @Query(value = "SELECT * FROM Transaccion WHERE usuario_id = :usuarioId ORDER BY fecha_transaccion DESC", nativeQuery = true)
    List<Transaccion> encontrarTodasPorUsuarioIdOrdenadoPorFechaAsc(@Param("usuarioId") int usuarioId);

    @Query (value = "SELECT u.nombre, AVG(t.monto_transaccion) AS Promedio \n" +
            "FROM transaccion t \n" +
            "JOIN usuario u ON u.usuario_id = t.usuario_id \n" +
            "WHERE t.fecha_transaccion BETWEEN :date1 AND :date2 \n" +
            "GROUP BY u.nombre", nativeQuery = true)
    public List<String[]> PromedioTransaccion(@Param("date1")LocalDate date1, @Param("date2")LocalDate date2);

    @Query(value =
            "SELECT \n" +
                    "u.nombre AS nombre_usuario,\n" +
                    "u.apellido,\n" +
                    "COUNT(CASE WHEN t.es_manual THEN 1 END) AS transacciones_manuales,\n" +
                    "COUNT(CASE WHEN NOT t.es_manual THEN 1 END) AS transacciones_cuenta\n" +
                    "FROM \n" +
                    "usuario u\n" +
                    "JOIN rol r ON u.rol_id = r.id_rol\n" +
                    "JOIN transaccion t ON u.usuario_id = t.usuario_id\n" +
                    "WHERE\n" +
                    "r.nombre = 'CLIENTE' \n" +
                    "GROUP BY \n" +
                    "u.usuario_id, u.nombre, u.apellido;"
            , nativeQuery = true)
    public List<String[]>contarTranxManualyCta();

    @Query(value =
            "SELECT\n" +
                    "c.nombre AS categoria,\n" +
                    "EXTRACT(MONTH FROM t.fecha_transaccion) AS mes,\n" +
                    "SUM(CASE WHEN NOT t.es_ingreso_transaccion THEN t.monto_transaccion ELSE 0 END) AS total_egresos,\n" +
                    "AVG(CASE WHEN NOT t.es_ingreso_transaccion THEN t.monto_transaccion ELSE 0 END) AS promedio_egresos\n" +
                    "FROM\n" +
                    "transaccion t\n" +
                    "INNER JOIN\n" +
                    "categoria_tranx c ON t.categoria_id = c.id_categoriatranx\n" +
                    "WHERE\n" +
                    "t.es_ingreso_transaccion = false\n" +
                    "AND EXTRACT(YEAR FROM t.fecha_transaccion) = 2024\n"+
                    "AND EXTRACT(MONTH FROM t.fecha_transaccion) = :mes \n"+
                    "GROUP BY\n" +
                    "c.nombre,\n" +
                    "EXTRACT(MONTH FROM t.fecha_transaccion);", nativeQuery = true)
    public List<String[]>promedioegresosporcategoria(@Param("mes") int mes);


    @Query(value = "SELECT\n" +
            "TO_CHAR(t.fecha_transaccion, 'FMMonth') as mes,\n" +
            "AVG(CASE WHEN NOT t.es_ingreso_transaccion THEN t.monto_transaccion ELSE 0 END) AS promedio_egresos,\n" +
            "AVG(CASE WHEN t.es_ingreso_transaccion THEN t.monto_transaccion ELSE 0 END) AS promedio_ingresos\n" +
            "FROM\n" +
            "transaccion t\n" +
            "WHERE\n" +
            "usuario_id = :usuarioId\n" +
            "GROUP BY TO_CHAR(t.fecha_transaccion, 'FMMonth'), EXTRACT(YEAR FROM t.fecha_transaccion), EXTRACT(MONTH FROM t.fecha_transaccion)\n" +
            "ORDER BY EXTRACT(YEAR FROM t.fecha_transaccion), EXTRACT(MONTH FROM t.fecha_transaccion)", nativeQuery = true)
    public List<String[]> promedioingresoegresopormes(@Param("usuarioId") int usuarioId);

}
