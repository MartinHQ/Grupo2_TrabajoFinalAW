package pe.edu.upc.TrabajoBackEnd.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upc.TrabajoBackEnd.entities.TipoMeta;

import java.util.List;

@Repository
public interface ITipoMetaRepository extends JpaRepository<TipoMeta, Integer> {

    public List<TipoMeta> findByNombre(String nombre);
}

