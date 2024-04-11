package pe.edu.upc.TrabajoBackEnd.servicesimplements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.TrabajoBackEnd.entities.CategoriaMeta;
import pe.edu.upc.TrabajoBackEnd.repositories.ICategoriaMetaRepository;
import pe.edu.upc.TrabajoBackEnd.servicesinterfaces.ICategoriaMetaService;

import java.util.List;
@Service
public class CategoriaMetaServiceImplement implements ICategoriaMetaService {

    @Autowired
    private ICategoriaMetaRepository cmR;
    @Override
    public void insert(CategoriaMeta categoriameta){
        cmR.save(categoriameta);
    }
    @Override
    public List<CategoriaMeta> list(){
        return cmR.findAll();
    }
    @Override
    public void delete(int id)
    {
        cmR.deleteById(id);
    }
    @Override
    public CategoriaMeta listId(int id) {
        return cmR.findById(id).orElse(new CategoriaMeta());
    }
    @Override
    public List<CategoriaMeta> findbyNombre(String nombre){
        return cmR.findByNombre(nombre);
    }
}
