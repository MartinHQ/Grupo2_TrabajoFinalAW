package pe.edu.upc.TrabajoBackEnd.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.TrabajoBackEnd.entities.MetaDeAhorro;
import java.util.List;
@Repository
public interface IMetaDeAhorroRepository extends JpaRepository<MetaDeAhorro, Integer> {
   @Query(value = "Select u.nombre, count(ma.metadeahorro) as metas_cumplidas \n"+
                 "from Usuario u  \n" +
                 "join meta_de_ahorro ma on u.usuario_id = ma.usuario_id \n"+
                 " where ma.meta_cumplida = 'true' \n"+
                 "group by u.nombre", nativeQuery = true)
    List<String[]> listarpormetascumplidas();
}
