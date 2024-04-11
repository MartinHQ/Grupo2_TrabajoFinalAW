package pe.edu.upc.TrabajoBackEnd.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upc.TrabajoBackEnd.entities.Categoriatranx;

import java.util.List;

@Repository
public interface ICategoriatranxRepository extends JpaRepository<Categoriatranx, Integer> {
    public List<Categoriatranx> findByNombre(String nombre);
}
