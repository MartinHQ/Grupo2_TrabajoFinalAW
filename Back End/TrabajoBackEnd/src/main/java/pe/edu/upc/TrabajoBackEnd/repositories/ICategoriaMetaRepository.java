package pe.edu.upc.TrabajoBackEnd.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upc.TrabajoBackEnd.entities.CategoriaMeta;

import java.util.List;

@Repository
public interface ICategoriaMetaRepository extends JpaRepository<CategoriaMeta, Integer> {

    public List<CategoriaMeta> findByNombre(String nombre);
}

