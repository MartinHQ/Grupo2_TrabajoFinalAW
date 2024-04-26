package pe.edu.upc.TrabajoBackEnd.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.TrabajoBackEnd.entities.Consejo;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IConsejoRepository extends JpaRepository<Consejo, Integer> {
    public List<Consejo> findByTitulo(String titulo);

    @Query(value = "SELECT c.id_consejo, c.titulo, c.descripcion \n" +
            "FROM consejo c \n" +
            "WHERE LOWER(c.titulo) IN ( \n" +
            "    SELECT LOWER(categoria) \n" +
            "    FROM ( \n" +
            "        SELECT ct.nombre as categoria, MAX(t.monto_transaccion) as maximo_monto \n" +
            "\t\t FROM Transaccion t \n" +
            "\t\t JOIN categoria_tranx ct ON t.categoria_id = ct.id_categoriatranx \n" +
            "\t\t JOIN usuario u ON u.usuario_id = t.usuario_id \n" +
            "WHERE t.es_ingreso_transaccion = false \n" +
            "AND t.usuario_id = :id_usuario \n" +
            "AND t.fecha_transaccion BETWEEN :date1 AND :date2 \n" +
            "GROUP BY ct.nombre \n" +
            "    ) AS subconsulta \n" +
            ");", nativeQuery = true)
    public List<Consejo> listarConsejoPorMaxMontoCategoria(LocalDate date1,
                                                           LocalDate date2,
                                                           int id_usuario);
}
