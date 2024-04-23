package pe.edu.upc.TrabajoBackEnd.servicesimplements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.TrabajoBackEnd.entities.TipoMeta;
import pe.edu.upc.TrabajoBackEnd.repositories.ITipoMetaRepository;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.ITipoMetaService;

import java.util.List;
@Service
public class TipoMetaServiceImplement implements ITipoMetaService {

    @Autowired
    private ITipoMetaRepository cmR;
    @Override
    public void insert(TipoMeta tipoMeta){
        cmR.save(tipoMeta);
    }
    @Override
    public List<TipoMeta> list(){
        return cmR.findAll();
    }
    @Override
    public void delete(int id)
    {
        cmR.deleteById(id);
    }
    @Override
    public TipoMeta listId(int id) {
        return cmR.findById(id).orElse(new TipoMeta());
    }
    @Override
    public List<TipoMeta> findbyNombre(String nombre){
        return cmR.findByNombre(nombre);
    }
}
