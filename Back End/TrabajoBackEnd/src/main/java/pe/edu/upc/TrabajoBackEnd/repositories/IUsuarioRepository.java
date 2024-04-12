package pe.edu.upc.TrabajoBackEnd.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.upc.TrabajoBackEnd.entities.Usuario;
import java.util.List;
@Repository
public interface IUsuarioRepository extends JpaRepository<Usuario, Integer> {
    public List<Usuario> findById(int id);
}
