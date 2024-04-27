package pe.edu.upc.TrabajoBackEnd.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.TrabajoBackEnd.entities.Consejo;

import java.util.List;

@Repository
public interface IConsejoRepository extends JpaRepository<Consejo, Integer> {
    public List<Consejo> findByTitulo(String titulo);
    @Query(value = " SELECT * FROM consejo c \n" +
            "WHERE c.titulo ILIKE %?1% OR c.descripcion ILIKE %?1%", nativeQuery = true)
    public List<Consejo> listarporKeyword(@Param("keyword") String keyword);
}