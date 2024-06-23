package pe.edu.upc.TrabajoBackEnd.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.TrabajoBackEnd.entities.MetaDeAhorro;
import java.util.List;
@Repository
public interface IMetaDeAhorroRepository extends JpaRepository<MetaDeAhorro, Integer> {
   @Query(value = "SELECT 'Metas Cumplidas' AS Estado_Meta, \r\n" +
          "       COALESCE (SUM(CASE WHEN m.meta_cumplida THEN 1 END),0) AS Cantidad\r\n" + 
          "FROM meta_de_ahorro m\r\n" + 
          "WHERE m.usuario_id =:usuario_id\r\n" + 
          "\r\n" + 
          "UNION ALL\r\n" + 
          "\r\n" + 
          "SELECT 'Metas no Cumplidas' AS Estado_Meta,\r\n" + 
          "       COALESCE (SUM(CASE WHEN NOT m.meta_cumplida THEN 1 END),0) AS Cantidad\r\n" + 
          "FROM meta_de_ahorro m\r\n" + 
          "WHERE m.usuario_id = usuario_id;", nativeQuery = true)
      public List<String[]> listarcantidadmetascumplidasynocumplidas(@Param("usuario_id") int usuario_id);

    @Query(value="SELECT * FROM meta_de_ahorro\r\n" + //
                    "    WHERE usuario_id=:usuario_id\r\n" + //
                    "\tOrder by fecha_limite DESC",nativeQuery=true)
    List<MetaDeAhorro> listarporelusuarioactivo(@Param("usuario_id") int usuario_id);
}
