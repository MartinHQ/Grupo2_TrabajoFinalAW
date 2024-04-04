package pe.edu.upc.TrabajoBackEnd.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upc.TrabajoBackEnd.entities.PreguntasFrecuentes;

@Repository
public interface iPreguntasFrecuentes extends JpaRepository<PreguntasFrecuentes,Integer> {
}
