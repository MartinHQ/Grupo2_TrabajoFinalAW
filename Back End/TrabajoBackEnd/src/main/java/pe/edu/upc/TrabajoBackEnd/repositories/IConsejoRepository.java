package pe.edu.upc.TrabajoBackEnd.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upc.TrabajoBackEnd.entities.Consejo;

import java.util.List;

@Repository
public interface IConsejoRepository extends JpaRepository<Consejo, Integer> {
    public List<Consejo> findByTitulo(String titulo);
}
