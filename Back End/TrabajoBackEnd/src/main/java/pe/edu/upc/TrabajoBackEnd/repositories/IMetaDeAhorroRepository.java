package pe.edu.upc.TrabajoBackEnd.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.TrabajoBackEnd.entities.MetaDeAhorro;
import java.util.List;
@Repository
public interface IMetaDeAhorroRepository extends JpaRepository<MetaDeAhorro, Integer> {
   @Query(value = "SELECT u.nombre,\r\n" + 
                  "       COUNT(mc.metadeahorro) AS metas_cumplidas,\r\n" + 
                  "       COUNT(mnc.metadeahorro) AS metas_no_cumplidas\r\n" + 
                  "FROM Usuario u\r\n" + 
                  "LEFT JOIN meta_de_ahorro mc ON u.usuario_id = mc.usuario_id AND mc.meta_cumplida = 'true'\r\n" + 
                  "LEFT JOIN meta_de_ahorro mnc ON u.usuario_id = mnc.usuario_id AND mnc.meta_cumplida = 'false'\r\n" + 
                  "WHERE u.usuario_id = :usuario_id \r\n" + 
                  "GROUP BY u.nombre;", nativeQuery = true)
    List<MetaDeAhorro> listarcantidadmetascumplidasynocumplidas(@Param("usuario_id") int usuario_id);

    @Query(value="SELECT * FROM meta_de_ahorro \n"+
          "WHERE usuario_id= :usuario_id",nativeQuery=true)
    List<MetaDeAhorro> listarporelusuarioactivo(@Param("usuario_id") int usuario_id);
}
