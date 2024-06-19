package pe.edu.upc.TrabajoBackEnd.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.TrabajoBackEnd.entities.Consejo;
import pe.edu.upc.TrabajoBackEnd.entities.Usuario;
import pe.edu.upc.TrabajoBackEnd.repositories.IUsuarioRepository;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.IUsuarioService;
import java.util.List;
@Service
public class UsuarioServiceImplement implements IUsuarioService {
    @Autowired
    private IUsuarioRepository uR;
    @Override
    public void insert(Usuario usuario) {
        uR.save(usuario);
    }

    @Override
    public List<Usuario> list() {
        return uR.findAll();
    }

    @Override
    public void delete(int id) {
        uR.deleteById(id);
    }

    @Override
    public Usuario findByCorreo(String correo){return uR.findByCorreo(correo);}

    @Override
    public Usuario listId(int id) {return uR.findById(id).orElse(new Usuario());}

}
