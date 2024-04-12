package pe.edu.upc.TrabajoBackEnd.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upc.TrabajoBackEnd.entities.MetaDeAhorro;
import java.util.List;
@Repository
public interface IMetaDeAhorroRepository extends JpaRepository<MetaDeAhorro, Integer> {

}
