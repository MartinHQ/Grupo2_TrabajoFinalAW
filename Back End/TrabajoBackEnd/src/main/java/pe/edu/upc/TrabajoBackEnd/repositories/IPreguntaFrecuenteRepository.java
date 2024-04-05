package pe.edu.upc.TrabajoBackEnd.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upc.TrabajoBackEnd.entities.PreguntaFrecuente;

@Repository
public interface IPreguntaFrecuenteRepository extends JpaRepository<PreguntaFrecuente,Integer> {
    public PreguntaFrecuente findByPreguntaPreguntaFrecuente(String pregunta);
}
