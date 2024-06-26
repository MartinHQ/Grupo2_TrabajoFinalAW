package pe.edu.upc.TrabajoBackEnd.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import pe.edu.upc.TrabajoBackEnd.entities.MetaDeAhorro;
import pe.edu.upc.TrabajoBackEnd.repositories.IMetaDeAhorroRepository;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.IMetaDeAhorroService;

import java.util.List;
@Service
public class MetaDeAhorroServiceImplement implements IMetaDeAhorroService {
    @Autowired
    private IMetaDeAhorroRepository mR;
    @Override
    public void insert(MetaDeAhorro metaDeAhorro) {
        mR.save(metaDeAhorro);
    }
    @Override
    public List<MetaDeAhorro> list() {
        return mR.findAll();
    }
    @Override
    public void delete(int id) {
        mR.deleteById(id);
    }

    @Override
    public MetaDeAhorro listarID(int id) {
        return mR.findById(id).orElse(new MetaDeAhorro());
    }

    @Override
    public List<MetaDeAhorro> obtenermetasdeahorroporusuario(int usuario_id) {
        return mR.listarporelusuarioactivo(usuario_id);
    }
    @Override
    public List<String[]> listarcantidadmetascumplidasynocumplidas(int usuario_id){
        return mR.listarcantidadmetascumplidasynocumplidas(usuario_id);
    }
    
}
