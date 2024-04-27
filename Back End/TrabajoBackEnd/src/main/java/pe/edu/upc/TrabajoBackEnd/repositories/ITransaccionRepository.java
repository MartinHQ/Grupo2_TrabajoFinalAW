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
            "r.nombre = 'CLIENTE'\n" +
            "GROUP BY\n" +
            "u.usuario_id, u.nombre, u.apellido;"
            , nativeQuery = true)
    public List<String[]>contarTranxManualyCta();

}